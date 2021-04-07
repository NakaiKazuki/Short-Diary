class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: :destroy

  def create
    diary = current_user.diaries.build(diary_params)

    # 送られてくる画像データ(base64)をデコード
    if params[:picture]
      blob = ActiveStorage::Blob.create_after_upload!(
      io: StringIO.new(decode(params[:picture][:data]) + "\n"),
      filename: params[:picture][:name]
     )
     diary.picture.attach(blob)
    end

    if diary.save
      @pagy, diaries = pagy(current_user.diaries.all)
      render json: {
        diaries: diaries,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json:{errors: diary.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    render json: {}, status: :ok
  end

  private

    def diary_params
      params.require(:diary).permit(:content, :date, :picture)
    end

    def correct_user
      diary = current_user.diaries.find(params[:id])
      render json: {}, status: :forbidden if diary.nil?
    end

    def decode(str)
      Base64.decode64(str.split(',').last)
    end
end
