class Api::V1::HomeController < ApplicationController
  def home
    return render json: {}, status: :ok unless user_signed_in?

    home = "#{current_user.name}がログインしてんで"
    render json: {
      home: home
    }, status: :ok
  end
end
