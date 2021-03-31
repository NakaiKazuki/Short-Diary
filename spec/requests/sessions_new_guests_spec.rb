require 'rails_helper'

RSpec.describe 'SessionsNewGuests', type: :request do
  describe 'POST api/v1/auth/guest_sign_in' do
    it 'ゲストユーザのデータが無ければ作成' do
      expect {
        post api_v1_auth_guest_sign_in_path
      }.to change(User, :count).by(1)
    end

    it 'ゲストユーザのデータがあればデータを返す' do
      create(:guest)
      post api_v1_auth_guest_sign_in_path
      expect(response.status).to eq(200)
    end

    describe 'Response' do
      # サーバへのリクエスト
      before do
        post api_v1_auth_guest_sign_in_path
      end

      it 'Response Status' do
        expect(response.status).to eq(200)
      end

      describe 'Response Headers Properties' do
        # Headersを変数へ
        before do
          @json_headers = response.headers
        end

        it 'access_token' do
          expect(@json_headers['access-token']).to be_truthy
        end

        it 'uid' do
          expect(@json_headers['uid']).to eq 'guest@example.com'
        end

        it 'client' do
          expect(@json_headers['client']).to be_truthy
        end
      end

      describe 'Response Body Properties' do
        # Bodyを変数へ
        before do
          @json_body = JSON.parse(response.body)
        end

        it 'id' do
          expect(@json_body['data']['id']).to eq 1
        end

        it 'name' do
          expect(@json_body['data']['name']).to eq 'ゲストユーザ'
        end

        it 'email' do
          expect(@json_body['data']['email']).to eq 'guest@example.com'
        end
        # 画像は追加していないためnilを返す

        it 'image' do
          expect(@json_body['data']['image']).to eq nil
        end
      end
    end
  end
end
