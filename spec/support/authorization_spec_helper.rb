module AuthorizationSpecHelper
  def sign_in(user)
    post '/api/v1/auth/sign_in',
         params: { email: user.email, password: user.password },
         as: :json

    response.headers.slice('client', 'access-token', 'uid')
  end
end
