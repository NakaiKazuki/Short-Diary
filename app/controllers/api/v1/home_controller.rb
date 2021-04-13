# frozen_string_literal: true

class Api::V1::HomeController < ApplicationController
  before_action :authenticate_user!

  def home
    @pagy, diaries = pagy(current_user.diaries.all)
    render json: {
      diaries: diaries,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end
end