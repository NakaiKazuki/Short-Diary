# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Diaries' do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }
  let(:picture_data) {
    'data:image/jpeg;base64,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'
  }

  describe 'POST api/v1/diaries' do
    # 有効な情報を保持している
    def post_information(content, tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today.strftime('%Y-%m-%d'),
          content:,
          tag_list: 'testTag1, testTag2',
          movie_source: 'example.com'
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def post_information_add_picture(tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today.strftime('%Y-%m-%d'),
          content: 'テストcontent',
          tag_list: 'testTag1, testTag2',
          movie_source: 'example.com'
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
            response.parsed_body
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
            response.parsed_body
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

            it 'movie_source' do
              expect(diary_json['movie_source']).to eq 'example.com'
            end

            it 'picture_url(画像あり)' do
              post_information_add_picture(auth_tokens)
              add_pic_json = response.parsed_body
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
    let!(:diary) { create(:diary, user:) }

    # 有効な情報を保持している
    def patch_information(content, tokens, tag_list = 'Path Tag1, Path Tag2', movie_source = 'example.com')
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: (Time.zone.today - 1).strftime('%Y-%m-%d'),
          content:,
          tag_list:,
          movie_source:
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def patch_information_add_picture(tokens)
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: (Time.zone.today - 1).strftime('%Y-%m-%d'),
          content: 'テスト編集済みContent',
          tag_list: 'Path Tag1, Path Tag2',
          movie_source: 'example.com'
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
            response.parsed_body
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
          expect(diary.reload.picture).to be_truthy
        end

        it 'タグ,動画が空の場合は削除' do
          patch_information('テスト編集済みcontent', auth_tokens, nil, nil)
          expect(diary.reload.tag_list).to eq []
          expect(diary.reload.movie_source).to be_nil
        end

        describe 'JSON' do
          subject(:diary_json) {
            json_body['diaries'][0]
          }

          let(:json_body) {
            patch_information('テスト編集済みcontent', auth_tokens)
            response.parsed_body
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

            it 'movie_source' do
              expect(diary_json['movie_source']).to eq 'example.com'
            end

            it 'picture_url(画像あり)' do
              patch_information_add_picture(auth_tokens)
              add_pic_json = response.parsed_body
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
    let!(:diary) { create(:diary, user:) }

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
            response.parsed_body
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
      response.parsed_body
    }

    it '画像あり' do
      create(:diary, :add_picture, user:)
      expect(json_body['items'][0]).to be_truthy
    end

    it '画像無し' do
      expect(json_body['items'][0]).to be_nil
    end
  end
end
