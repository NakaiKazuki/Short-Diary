# frozen_string_literal: true

class Api::V1::ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    # 保存とメール送信(同期処理)　非同期の場合は deliver_later を使う
    if contact.save && ContactMailer.with(contact).contact_mail.deliver_now
      render json: { message: 'お問い合わせメールの送信に成功しました！' }, status: :ok
    else
      render json: { errors: contact.errors }, status: :unprocessable_entity # status: 422
    end
  end

  private

    def contact_params
      params.permit(:name, :email, :over_view, :content)
    end
end
