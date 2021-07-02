require 'rails_helper'

RSpec.describe "Registrations", type: :request do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }
  describe "Put /api/v1/auth" do
    def put_information(name = user.name, email = user.email, password = nil, password_confirmation = nil, current_password = user.password, tokens)
      put user_registration_path, params: {
        user: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          current_password: current_password
        }
      }, headers: tokens
    end
    context 'ログインしていない場合' do
      it 'Response 401' do
        put_information
        expect(response.status).to eq(401)
      end
    end
  end
end
