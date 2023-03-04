# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'home#home'

      resources :diaries, only: %i[create update destroy]

      resources :contacts, only: %i[create]

      get 'photo_gallery', to: 'diaries#photo_gallery'

      devise_scope :user do
        post 'auth/guest_sign_in', to: 'auth/sessions#new_guest'
        post 'auth/auto_login', to: 'auth/sessions#auto_login'
      end
    end
  end
  mount_devise_token_auth_for 'User', at: 'api/v1/auth', controllers: {
    registrations: 'api/v1/auth/registrations'
  }
  mount LetterOpenerWeb::Engine, at: 'letter_opener' if Rails.env.development?
end
