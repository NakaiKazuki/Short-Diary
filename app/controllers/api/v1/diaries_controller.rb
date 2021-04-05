class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: :destroy

  def create
    diary = current_user.diaries.build(diary_params) if user_signed_in?
    if diary.save
      render json: {}, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    render json: {}, status: :ok
  end

  private

    def diary_params
      params.require(:diary).permit(:content, :date)
    end

    def correct_user
      diary = current_user.diaries.find(params[:id])
      render json: {}, status: :forbidden if diary.nil?
    end
end
