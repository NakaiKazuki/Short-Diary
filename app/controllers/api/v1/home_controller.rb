class Api::V1::HomeController < ApplicationController
  before_action :authenticate_user!

  def home
    diaries = current_user.diaries.all
    @pagy, diaries = pagy(u.diaries.all)
    render json: {
      diaries: diaries,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end
end
