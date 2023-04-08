# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pagy::Backend
  protect_from_forgery with: :null_session
  # before_action :fake_load
  before_action :track if Rails.env.production?

  def track
    # Google Analyticsのトラッキングコードを呼び出す
    tracker = Staccato.tracker(Rails.application.config.google_analytics.tracking_id)
    tracker.pageview(request.original_url)
  end

  # def fake_load
  #   sleep(3)
  # end
end
