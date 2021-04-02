# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'home#home'
      resources :diaries, only: %i[create destroy]

      devise_scope :user do
        post 'auth/guest_sign_in', to: 'auth/sessions#new_guest'
      end
    end
  end
  mount_devise_token_auth_for 'User', at: 'api/v1/auth', controllers: {
    registrations: 'api/v1/auth/registrations'
  }

  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
