# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pagy::Backend
  protect_from_forgery with: :null_session
  # before_action :fake_load
  before_action :send_google_analytics_event if Rails.env.production?

  private

  def send_google_analytics_event
    ActiveSupport::Notifications.instrument('process_action.action_controller', payload)
  end

  def payload
    {
      controller: self.class.name,
      action: action_name,
      format: request.format.symbol.to_s,
      start: Time.now
    }
  end
  # def fake_load
  #   sleep(3)
  # end
end
