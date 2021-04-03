class Api::V1::HomeController < ApplicationController
  def home
    # return unless user_signed_in?

    diaries = current_user.diaries.all
    render json: {
      diaries: diaries
    }, status: :ok
  end
end
