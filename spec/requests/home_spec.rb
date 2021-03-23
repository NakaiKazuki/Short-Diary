require 'rails_helper'

RSpec.describe 'Homes', type: :request do
  describe 'GET /home' do
    it 'returns http success' do
      get api_v1_root_path
      expect(response).to have_http_status(:success)
    end
  end
end
