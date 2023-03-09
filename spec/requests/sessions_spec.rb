# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sessions' do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }

  describe 'POST api/v1/auth/guest_sign_in' do
    it 'ゲストユーザのデータが無ければ作成' do
      expect {
        post api_v1_auth_guest_sign_in_path
      }.to change(User, :count).by(1)
    end

    it 'ゲストユーザのデータがあればデータを返す' do
      create(:guest)
      post api_v1_auth_guest_sign_in_path
      expect(response).to have_http_status(:ok)
    end

    describe 'Response' do
      before do
        create(:guest)
      end

      it 'Response Status' do
        post api_v1_auth_guest_sign_in_path
        expect(response).to have_http_status(:ok)
      end

      describe 'Response Headers Properties' do
        subject(:json_headers) {
          post api_v1_auth_guest_sign_in_path
          response.headers
        }

        it 'access_token' do
          expect(json_headers['access-token']).to be_truthy
        end

        it 'uid' do
          expect(json_headers['uid']).to eq 'guest@example.com'
        end

        it 'client' do
          expect(json_headers['client']).to be_truthy
        end
      end

      describe 'Response Body Properties' do
        subject(:json_body) {
          post api_v1_auth_guest_sign_in_path
          response.parsed_body
        }

        it 'id' do
          expect(json_body['id']).to eq 1
        end

        it 'name' do
          expect(json_body['name']).to eq 'ゲストユーザ'
        end

        it 'email' do
          expect(json_body['email']).to eq 'guest@example.com'
        end

        # 画像は追加していないためnilを返す
        it 'image' do
          expect(json_body['image']).to be_nil
        end
      end
    end
  end

  describe 'POST api/v1/auth/user_login' do
    it 'Response Status' do
      post api_v1_auth_user_login_path, headers: auth_tokens
      expect(response).to have_http_status(:ok)
    end

    describe 'Response' do
      before do
        create(:user)
      end

      describe 'Response Headers Properties' do
        subject(:json_headers) {
          post api_v1_auth_user_login_path, headers: auth_tokens
          response.headers
        }

        it 'access_token' do
          expect(json_headers['access-token']).to be_truthy
        end

        it 'uid' do
          expect(json_headers['uid']).to eq user.email
        end

        it 'client' do
          expect(json_headers['client']).to be_truthy
        end
      end

      describe 'Response Body Properties' do
        subject(:json_body) {
          post api_v1_auth_user_login_path, headers: auth_tokens
          response.parsed_body
        }

        it 'id' do
          expect(json_body['current_user']['id']).to eq user.id
        end

        it 'name' do
          expect(json_body['current_user']['name']).to eq user.name
        end

        it 'email' do
          expect(json_body['current_user']['email']).to eq user.email
        end

        # 画像は追加していないためnilを返す
        it 'image' do
          expect(json_body['current_user']['image']).to be_nil
        end
      end
    end
  end
end
