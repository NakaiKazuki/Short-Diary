# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Homes', type: :request do
  let(:user) { create(:user) }
  let(:auth_tokens) { sign_in(user) }

  describe 'GET /home' do
    context 'ログインしていない場合' do
      it 'Response 401' do
        get api_v1_root_path
        expect(response.status).to eq(401)
      end
    end

    context 'ログインしている場合' do
      it 'Response 200' do
        get api_v1_root_path, headers: auth_tokens
        expect(response.status).to eq(200)
      end

      describe 'JSON' do
        let(:json_body) {
          get api_v1_root_path, headers: auth_tokens
          JSON.parse(response.body)
        }

        # 値がないと空の配列が返る
        it 'diaries' do
          expect(json_body['diaries']).to be_truthy
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
