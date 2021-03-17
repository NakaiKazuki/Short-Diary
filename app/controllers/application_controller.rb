# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  # CSRF対策
  protect_from_forgery with: :null_session
end
