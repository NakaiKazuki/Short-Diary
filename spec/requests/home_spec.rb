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

        it 'picture_url' do
          create(:diary, :add_picture, user: user)
          expect(json_body['diaries'][0]['picture_url']).to be_truthy
        end

        describe 'diaries' do
          it '値がないと空の配列が返る' do
            expect(json_body['diaries']).to eq []
          end

          describe '検索機能' do
            let(:search_json_body) {
              get api_v1_root_path, params: {
                date_or_content_cont: Time.zone.today.strftime('%Y-%m-%d')
              }, headers: auth_tokens
              JSON.parse(response.body)
            }

            it '値がないと空の配列が返る' do
              expect(search_json_body['diaries']).to eq []
            end

            it '検索対象のデータが見つかった場合' do
              create(:diary, user: user)
              expect(search_json_body['diaries'][0]['date']).to eq Time.zone.today.strftime('%Y-%m-%d')
            end

            it '検索対象のデータが見つからなかった場合' do
              create(:diary, user: user, date: Time.zone.today + 1)
              expect(search_json_body['diaries']).to eq []
            end
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
