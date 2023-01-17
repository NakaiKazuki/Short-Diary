# frozen_string_literal: true

class Api::V1::HomeController < ApplicationController
  before_action :authenticate_user!

  def home
    search = current_user.diaries.ransack(search_params)
    @pagy, diaries = pagy(search.result(distinct: true))
    render json: {
      diaries:,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end

  private

    def search_params
      params.permit(:content_or_date_cont)
    end
end
