# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Registrations', type: :request do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }

  describe 'Put /api/v1/auth' do
    context 'ログインしていない場合' do
      it 'Response 422' do
        put user_registration_path
        expect(response.status).to eq(422)
      end
    end

    context 'ログインしている場合' do
      describe '無効' do
        let(:used_email) {
          other_user = create(:user, :other_email)
          put user_registration_path, params: {
            email: other_user.email,
            current_password: user.password
          }, headers: auth_tokens
          JSON.parse(response.body)
        }

        def incorrect_password
          put user_registration_path, params: {
            current_password: 'testpassword'
          }, headers: auth_tokens
        end

        it '他者がメールアドレスを使用済みの場合' do
          expect(used_email['errors']['email'][0]).to eq 'は既に使用されています。'
        end

        it '使用中のパスワードが一致しなかった場合' do
          incorrect_password
          expect(response.status).to eq(422)
        end
      end

      describe '有効' do
        def put_information
          put user_registration_path, params: {
            email: user.email,
            current_password: user.password
          }, headers: auth_tokens
        end

        it 'ログインしているユーザのメールアドレスを送信した場合' do
          put_information
          expect(response.status).to eq(200)
        end
      end
    end
  end
end
