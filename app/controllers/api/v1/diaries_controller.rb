class Api::V1::DiariesController < ApplicationController
  # before_action :authenticate_user!
  before_action :correct_user, only: :destroy

  def create
    return render json: {}, status: :ok if user_signed_in?
    diary = current_user.diaries.build(diary_params) if user_signed_in?
    if diary.save
      @pagy, diaries = pagy(current_user.diaries.all)
      render json: {
        diaries: diaries,
        pagy: pagy_metadata(@pagy)
      }, methods: [:picture_url], status: :ok
    else
      render json: {}, status: :unprocessable_entity
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
end
