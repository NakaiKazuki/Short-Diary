class Api::V1::HomeController < ApplicationController
  def home
    # return unless user_signed_in?
    home = '通信できてんで'

    render json: {
      home: home
    }, status: :ok
  end
end
