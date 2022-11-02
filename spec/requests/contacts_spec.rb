# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contacts' do
  before do
    ActionMailer::Base.deliveries.clear
  end

  describe 'Post api/v1/contacts' do
    def post_information(content = '有効')
      post api_v1_contacts_path, params: {
        name: 'テストユーザ',
        email: 'test@example.com',
        over_view: '無題',
        content: content
      }
    end

    describe '有効な情報' do
      it 'メールが送信される' do
        expect {
          post_information
        }.to change { ActionMailer::Base.deliveries.size }.by(1)
      end
    end

    describe '無効な情報' do
      it 'メールが送信されない' do
        expect {
          post_information(nil)
        }.not_to(change { ActionMailer::Base.deliveries.size })
      end

      it 'status422を返す' do
        post_information(nil)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'エラーメッセージを返す' do
        post_information(nil)
        json_body = JSON.parse(response.body)
        expect(json_body['errors']).to be_truthy
      end
    end
  end
end
