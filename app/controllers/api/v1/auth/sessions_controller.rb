# frozen_string_literal: true

class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  # ゲストユーザ作成とログイン DeviseTokenAuth からパクったなんで動いてるのかは知らん
  def new_guest
    @resource = User.guest
    @token = @resource.create_token
    @resource.save

    sign_in(:user, @resource, store: false, bypass: false)
    render json: {
      data: resource_data(resource_json: @resource.token_validation_response)
    }, status: :ok
  end

  private

    def resource_data(opts = {})
      response_data = opts[:resource_json] || @resource.as_json
      response_data['type'] = @resource.class.name.parameterize if json_api?
      response_data
    end
end
