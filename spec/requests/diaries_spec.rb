require 'rails_helper'

RSpec.describe 'Diaries', type: :request do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }

  describe 'POST api/v1/diaries' do
    # 有効な情報を保持している
    def post_information(content, tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today,
          content: content
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def post_information_add_picture(tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today,
          content: 'テストPostContent',
          picture: Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/test.jpg'))
        }
      }, headers: tokens
    end

    context 'ログインしていない場合は無効' do
      it 'Response' do
        post_information('テストcontent', nil)
        expect(response.status).to eq(401)
      end

      it '無効' do
        expect {
          post_information('テストcontent', nil)
        }.to change(Diary, :count).by(0)
      end
    end

    context 'ログインしている場合' do
      context '無効なパラメータを送信' do
        it 'Response' do
          post_information(nil, auth_tokens)
          expect(response.status).to eq(422)
        end

        it 'データは作成されない' do
          expect {
            post_information(nil, auth_tokens)
          }.to change(Diary, :count).by(0)
        end
      end

      context '有効なパラメータを送信' do
        it 'Response' do
          post_information('テストcontent', auth_tokens)
          expect(response.status).to eq(200)
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
      end
    end
  end

  describe 'PATCH /api/v1/diaries/:id' do
    # let!(:other_user) { create(:guest) }
    let!(:diary) { create(:diary, user: user) }

    # 有効な情報を保持している
    def patch_information(content, tokens)
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: Time.zone.today - 1,
          content: content
        }
      }, headers: tokens
    end

    # 画像が追加された有効なパラメータ
    def patch_information_add_picture(tokens)
      patch api_v1_diary_path(diary), params: {
        diary: {
          id: diary.id,
          date: Time.zone.today - 1,
          content: 'テスト編集済みContent',
          picture: Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/test.jpg'))
        }
      }, headers: tokens
    end

    context 'ログインしていない場合は無効' do
      it 'Response' do
        patch_information('テスト編集済みcontent', nil)
        expect(response.status).to eq(401)
      end

      it '無効' do
        patch_information('テスト編集済みcontent', nil)
        expect(diary.reload.content).to eq 'テストcontent'
      end
    end

    context 'ログインしている場合' do
      it '一致しないユーザは無効' do
        patch_information('テスト編集済みcontent', sign_in(create(:guest)))
        expect(response.status).to eq(403)
      end

      context '無効なパラメータを送信' do
        it 'Response' do
          patch_information(nil, auth_tokens)
          expect(response.status).to eq(422)
        end

        it 'データは変更されない' do
          patch_information(nil, auth_tokens)
          expect(diary.reload.content).to eq 'テストcontent'
        end
      end

      context '有効なパラメータを送信' do
        it 'Response' do
          patch_information('テスト編集済みcontent', auth_tokens)
          expect(response.status).to eq(200)
        end

        it 'データは編集される' do
          patch_information('テスト編集済みcontent', auth_tokens)
          expect(diary.reload.content).to eq 'テスト編集済みcontent'
        end

        it '画像が追加された場合でも編集される' do
          patch_information_add_picture(auth_tokens)
          expect(diary.reload.content).to eq 'テスト編集済みContent'
        end
      end
    end
  end

  # describe 'DELETE /api/v1/diaries/:id' do
  #   def delete_information(tokens)
  #     patch api_v1_diary_path(diary), headers: tokens
  #   end
  # end
end
