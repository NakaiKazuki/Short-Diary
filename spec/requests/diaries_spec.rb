require 'rails_helper'
include ActionController::RespondWith

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

    # 画像が追加された有効パラメータ
    def post_information_add_image(tokens)
      post api_v1_diaries_path, params: {
        diary: {
          date: Time.zone.today,
          content: 'テストcontent',
          image: Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/test.jpg'))
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
          post_information("テストcontent", auth_tokens)
          expect(response.status).to eq(200)
        end

        it 'データは作成される' do
          expect {
            post_information("テストcontent", auth_tokens)
          }.to change(Diary, :count).by(1)
        end

        it '画像が追加された場合でも作成される' do
          expect {
            post_information_add_image(auth_tokens)
          }.to change(Diary, :count).by(1)
        end
      end
    end
  end
end
