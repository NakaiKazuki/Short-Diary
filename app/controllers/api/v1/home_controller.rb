# frozen_string_literal: true

class Api::V1::HomeController < ApplicationController
  before_action :authenticate_user!

  def home
    @q = current_user.diaries.ransack(search_params)
    @pagy, diaries = pagy(@q.result(distinct: true))
    render json: {
      diaries:,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end

  private

    def search_params
      params.fetch(:q, {}).permit(:content_or_date_or_tags_name_cont, :page)
    end
end
