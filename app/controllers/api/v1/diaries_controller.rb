# frozen_string_literal: true

class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: %i[update destroy]

  def create
    @diary = current_user.diaries.build(diary_params)

    # 画像が送られてきたら、その画像データ(base64)をデコード
    file_decode if params[:picture]

    if @diary.save
      @pagy, diaries = pagy(current_user.diaries.all)
      render json: {
        diaries: diaries,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json: { errors: @diary.errors }, status: :unprocessable_entity # status: 422
    end
  end

  def update
    # 画像が送られてきたら、その画像データ(base64)をデコード
    file_decode if params[:picture]

    if @diary.update(diary_params)
      @pagy, diaries = pagy(current_user.diaries.all, page: params[:page])
      render json: {
        diaries: diaries,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json: { errors: @diary.errors }, status: :unprocessable_entity # status: 422
    end
  end

  def destroy
    @diary.destroy
    @pagy, diaries = pagy(current_user.diaries.all, page: params[:page])
    render json: {
      diaries: diaries,
      pagy: pagy_metadata(@pagy)
    }, methods: [:picture_url], status: :ok
  end

  private

    def diary_params
      params.require(:diary).permit(:date, :content, :tag_list, :picture)
    end

    def correct_user
      @diary = current_user.diaries.find_by(id: params[:id])
      render json: {}, status: :forbidden if @diary.nil? # status: 403
    end

    # 画像ファイルをデコードしてアタッチ
    def file_decode
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("#{decode(params[:picture][:data])}\n"),
        filename: params[:picture][:name]
      )
      @diary.picture.attach(blob)
    end

    # 画像ファイルデコード
    def decode(str)
      Base64.decode64(str.split(',').last)
    end
end
