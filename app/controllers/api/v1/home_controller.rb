class Api::V1::HomeController < ApplicationController
  def home
    return render json: {}, status: :ok unless user_signed_in?

    dirays = current_user.diaries.all
    render json: {
      dirays: dirays
    }, status: :ok
  end
end
