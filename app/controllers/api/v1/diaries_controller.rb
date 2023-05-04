# frozen_string_literal: true

class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: %i[update destroy]
  # include Rails.application.routes.url_helpers
  def create
    @diary = current_user.diaries.build(diary_params)
    file_attach if params[:picture]

    if @diary.save
      @pagy, diaries = pagy(current_user.diaries.all)
      render json: {
        diaries:,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json: { errors: @diary.errors }, status: :unprocessable_entity # status: 422
    end
  end

  def update
    file_attach if params[:picture]

    if @diary.update(diary_params)
      @pagy, diaries = pagy(current_user.diaries.all, page: pagy_params[:page])
      render json: {
        diaries:,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json: { errors: @diary.errors }, status: :unprocessable_entity # status: 422
    end
  end

  def destroy
    @diary.destroy
    @pagy, diaries = pagy(current_user.diaries.all, page: pagy_params[:page])
    render json: {
      diaries:,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end

  def photo_gallery
    items = current_user.diaries.with_attached_picture.filter_map do |diary|
      { original: url_for(diary.picture) } if diary.picture.attached?
    end
    render json: { items: }, status: :ok
  end

  # 画像つき日記だけを表示させる用
  # def photo_gallery
  # diaries_with_picture = current_user.diaries.with_attached_picture.filter_map do |diary|
  #   diary if diary.picture.attached?
  # end
  # @pagy, diaries = pagy(diaries_with_picture, page: pagy_params[:page])
  # render json: {
  #   diaries:,
  #   pagy: pagy_metadata(@pagy)
  # }, methods: [:picture_url], status: :ok
  # end

  private

    def diary_params
    # require の代わりに permit を使い、空の値も許可する
      params.fetch(:diary, {}).permit(:date, :content, :tag_list, :picture, :movie_source).tap do |whitelisted|
        # もし params に tag_list, picture, movie_source が含まれていない場合、
        # whitelisted に nil を設定する
        whitelisted[:tag_list] = nil unless whitelisted.key?(:tag_list)
        whitelisted[:movie_source] = nil unless whitelisted.key?(:movie_source)
      end
    end

    def pagy_params
      params.permit(:page)
    end

    def correct_user
      @diary = current_user.diaries.find_by(id: params[:id])
      render json: {}, status: :forbidden if @diary.nil? # status: 403
    end

    # 画像ファイルをデコードしてアタッチ
    def file_attach
      @diary.picture.attach(data: params[:picture][:data], filename: params[:picture][:name])
    end
end
