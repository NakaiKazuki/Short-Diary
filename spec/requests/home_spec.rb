require 'rails_helper'

RSpec.describe 'Homes', type: :request do
  let!(:diary) { create(:diary) }
  describe 'GET /home' do
    context 'ログインしていない場合' do
      it 'returns http response 401' do
        get api_v1_root_path
        expect(response.status).to eq(401)
      end
    end
  end
end
