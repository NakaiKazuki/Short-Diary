# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  # before_action :fake_load

  # def fake_load
  #   sleep(10)
  # end
end
