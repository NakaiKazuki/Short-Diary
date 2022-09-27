# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Diaries', type: :request do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }
  let(:picture_data) {
    binary_data = Rails.root.join('spec/fixtures/images/test.jpg').read
    Base64.strict_encode64(binary_data)
  }

  describe 'POST api/v1/diaries' do
    # 有効な情報を保持している
    def post_information(content, tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today.strftime('%Y-%m-%d'),
          content: content,
          tag_list: 'testTag1, testTag2'
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def post_information_add_picture(tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today.strftime('%Y-%m-%d'),
          content: 'テストcontent'
        },
        picture: {
          data: picture_data,
          name: 'test_picture'
        },
        page: 1
      }, headers: tokens
    end

    context 'ログインしていない場合' do
      it 'Response' do
        post_information('テストcontent', nil)
        expect(response).to have_http_status(:unauthorized)
      end

      it '無効' do
        expect {
          post_information('テストcontent', nil)
        }.not_to change(Diary, :count)
      end
    end

    context 'ログインしている場合' do
      describe '無効なパラメータを送信' do
        it 'Response' do
          post_information(nil, auth_tokens)
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'データは作成されない' do
          expect {
            post_information(nil, auth_tokens)
          }.not_to change(Diary, :count)
        end

        describe 'JSON' do
          let(:json_body) {
            post_information(nil, auth_tokens)
            JSON.parse(response.body)
          }

          it 'エラーメッセージが返される' do
            expect(json_body['errors']).to be_truthy
          end
        end
      end

      describe '有効なパラメータを送信' do
        it 'Response' do
          post_information('テストcontent', auth_tokens)
          expect(response).to have_http_status(:ok)
        end

        it 'データは作成される' do
          expect {
            post_information('テストcontent', auth_tokens)
          }.to change(Diary, :count).by(1)
        end

        it '画像が追加された場合でも作成される' do
          expect {
            post_information_add_picture(auth_tokens)
          }.to change(Diary, :count).by(1)
        end

        describe 'JSON' do
          subject(:diary_json) {
            json_body['diaries'][0]
          }

          let(:json_body) {
            post_information('テストcontent', auth_tokens)
            JSON.parse(response.body)
          }

          describe 'diaries' do
            it 'date' do
              expect(diary_json['date']).to eq Time.zone.today.strftime('%Y-%m-%d')
            end

            it 'content' do
              expect(diary_json['content']).to eq 'テストcontent'
            end

            it 'picture_url(画像無し)' do
              expect(diary_json['picture_url']).to be_nil
            end

            it 'tag_list' do
              expect(diary_json['tag_list']).to eq %w[testTag1 testTag2]
            end

            it 'picture_url(画像あり)' do
              post_information_add_picture(auth_tokens)
              add_pic_json = JSON.parse(response.body)
              expect(add_pic_json['diaries'][0]['picture_url']).to be_truthy
            end
          end

          describe 'pagy' do
            subject(:pagy_json) {
              json_body['pagy']
            }

            it 'pages(全体のページ数)' do
              expect(pagy_json['pages']).to eq 1
            end

            it 'page(現在のページ)' do
              expect(pagy_json['page']).to eq 1
            end
          end
        end
      end
    end
  end

  describe 'PATCH /api/v1/diaries/:id' do
    let!(:diary) { create(:diary, user: user) }

    # 有効な情報を保持している
    def patch_information(content, tokens)
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: (Time.zone.today - 1).strftime('%Y-%m-%d'),
          content: content,
          tag_list: 'Path Tag1, Path Tag2'
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def patch_information_add_picture(tokens)
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: (Time.zone.today - 1).strftime('%Y-%m-%d'),
          content: 'テスト編集済みContent'
        },
        picture: {
          data: picture_data,
          name: 'test_picture'
        }
      }, headers: tokens
    end

    context 'ログインしていない場合' do
      it 'Response' do
        patch_information('テスト編集済みcontent', nil)
        expect(response).to have_http_status(:unauthorized)
      end

      it '無効' do
        patch_information('テスト編集済みcontent', nil)
        expect(diary.reload.content).to eq 'テストcontent'
      end
    end

    context 'ログインしている場合' do
      context 'データと一致しないユーザでログインしている場合' do
        it '無効' do
          patch_information('テスト編集済みcontent', sign_in(create(:guest)))
          expect(response).to have_http_status(:forbidden)
        end

        it 'データは編集されない' do
          patch_information('テスト編集済みcontent', sign_in(create(:guest)))
          expect(diary.reload.content).to eq 'テストcontent'
        end
      end

      context '無効なパラメータを送信' do
        it 'Response' do
          patch_information(nil, auth_tokens)
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'データは変更されない' do
          patch_information(nil, auth_tokens)
          expect(diary.reload.content).to eq 'テストcontent'
        end

        describe 'JSON' do
          let(:json_body) {
            patch_information(nil, auth_tokens)
            JSON.parse(response.body)
          }

          it 'エラーメッセージが返される' do
            expect(json_body['errors']).to be_truthy
          end
        end
      end

      context '有効なパラメータを送信' do
        it 'Response' do
          patch_information('テスト編集済みcontent', auth_tokens)
          expect(response).to have_http_status(:ok)
        end

        it 'データは編集される' do
          patch_information('テスト編集済みcontent', auth_tokens)
          expect(diary.reload.content).to eq 'テスト編集済みcontent'
        end

        it '画像が追加された場合でも編集される' do
          patch_information_add_picture(auth_tokens)
          expect(diary.reload.content).to eq 'テスト編集済みContent'
        end

        describe 'JSON' do
          subject(:diary_json) {
            json_body['diaries'][0]
          }

          let(:json_body) {
            patch_information('テスト編集済みcontent', auth_tokens)
            JSON.parse(response.body)
          }

          describe 'diaries' do
            it 'date' do
              expect(diary_json['date']).to eq (Time.zone.today - 1).strftime('%Y-%m-%d')
            end

            it 'content' do
              expect(diary_json['content']).to eq 'テスト編集済みcontent'
            end

            it 'tag_list' do
              expect(diary_json['tag_list']).to eq ['Path Tag1', 'Path Tag2']
            end

            it 'picture_url(画像無し)' do
              expect(diary_json['picture_url']).to be_nil
            end

            it 'picture_url(画像あり)' do
              patch_information_add_picture(auth_tokens)
              add_pic_json = JSON.parse(response.body)
              expect(add_pic_json['diaries'][0]['picture_url']).to be_truthy
            end
          end

          describe 'pagy' do
            subject(:pagy_json) {
              json_body['pagy']
            }

            it 'pages(全体のページ数)' do
              expect(pagy_json['pages']).to eq 1
            end

            it 'page(現在のページ)' do
              expect(pagy_json['page']).to eq 1
            end
          end
        end
      end
    end
  end

  describe 'DELETE /api/v1/diaries/:id' do
    let!(:diary) { create(:diary, user: user) }

    # 有効な情報を保持している
    def delete_information(tokens)
      delete api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id
        }
      }, headers: tokens
    end

    context 'ログインしていない場合は無効' do
      it 'Response' do
        delete_information(nil)
        expect(response).to have_http_status(:unauthorized)
      end

      it '無効' do
        expect {
          delete_information(nil)
        }.not_to change(Diary, :count)
      end
    end

    context 'ログインしている場合' do
      context 'データと一致しないユーザでログインしている場合' do
        it '無効' do
          delete_information(sign_in(create(:guest)))
          expect(response).to have_http_status(:forbidden)
        end

        it 'データは削除されない' do
          expect {
            delete_information(sign_in(create(:guest)))
          }.not_to change(Diary, :count)
        end
      end

      context '有効なパラメータを送信' do
        it 'Response' do
          delete_information(auth_tokens)
          expect(response).to have_http_status(:ok)
        end

        it 'データは削除される' do
          expect {
            delete_information(auth_tokens)
          }.to change(Diary, :count).by(-1)
        end

        describe 'JSON' do
          subject(:diary_json) {
            json_body['diaries'][0]
          }

          let(:json_body) {
            delete_information(auth_tokens)
            JSON.parse(response.body)
          }

          describe 'diaries' do
            it 'diary' do
              expect(diary_json).to be_nil
            end
          end

          describe 'pagy' do
            subject(:pagy_json) {
              json_body['pagy']
            }

            it 'pages(全体のページ数)' do
              expect(pagy_json['pages']).to eq 1
            end

            it 'page(現在のページ)' do
              expect(pagy_json['page']).to eq 1
            end
          end
        end
      end
    end
  end

  describe 'GET /api/v1/diaries/photo_gallery' do
    subject(:json_body) {
      get api_v1_photo_gallery_path(auth_tokens)
      JSON.parse(response.body)
    }

    it '画像あり' do
      create(:diary, :add_picture, user: user)
      expect(json_body['items'][0]).to be_truthy
    end

    it '画像無し' do
      expect(json_body['items'][0]).to be_nil
    end
  end
end
