# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Registrations' do
  let(:user) { create(:user) }
  let(:guest) { create(:guest) }
  let(:auth_tokens) { sign_in(user) }

  describe 'POST /api/v1/auth' do
    before do
      ActionMailer::Base.deliveries.clear
    end

    it '有効な情報の場合メールが送信される' do
      expect {
        post user_registration_path, params: {
          name: 'テストユーザ',
          email: 'test@example.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }.to change { ActionMailer::Base.deliveries.size }.by(1)
    end
  end

  describe 'Put /api/v1/auth' do
    context 'ログインしていない場合' do
      it 'Response 422' do
        put user_registration_path
        expect(response).to have_http_status(:unprocessable_entity)
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
          response.parsed_body
        }

        let(:put_guest) {
          put user_registration_path, params: {
            email: 'editguest@example.com',
            current_password: guest.password
          }, headers: sign_in(guest)
          response.parsed_body
        }

        def incorrect_password
          put user_registration_path, params: {
            current_password: 'testpassword'
          }, headers: auth_tokens
        end

        def put_guest_information
          put user_registration_path, params: {
            email: 'editguest@example.com',
            current_password: 'testpassword'
          }, headers: sign_in(guest)
        end

        it '他者がメールアドレスを使用済みの場合' do
          expect(used_email['errors']['email'][0]).to eq 'は既に使用されています。'
        end

        it '使用中のパスワードが一致しなかった場合' do
          incorrect_password
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'ゲストユーザの編集は無効' do
          put_guest_information
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'ゲストユーザ用エラーメッセージ' do
          expect(put_guest['errors']['guest'][0]).to eq 'ゲストユーザの登録情報は編集できません。'
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
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
end
