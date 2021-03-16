# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.2'

gem 'bootsnap', require: false
gem 'mysql2'
gem 'puma'
gem 'rack-cors'
gem 'rails', '~> 6.1.3'

# ここから追加gem
# 取り敢えず入れとく
gem 'autoprefixer-rails'
gem 'fast_blank'

# Userのあれこれ
gem 'devise'
gem 'devise_token_auth'

# 画像
gem 'mini_magick'

# 日本語化
gem 'rails-i18n'
# 追加gemここまで

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # ここから追加gem
  # セキュリティ云々を指摘してくれる
  gem 'brakeman', require: false

  # テスト用
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  # 追加gemここまで
end

group :development do
  gem 'listen'
  gem 'spring'

  # ここから追加gem
  # モデルのカラム内容を分かりやすく
  gem 'annotate'

  # エラー画面を見やすく
  gem 'better_errors'
  gem 'binding_of_caller'

  # メール確認用
  gem 'letter_opener'
  gem 'letter_opener_web'

  # rubocop関連
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec'
  # 追加gemここまで
end

group :test do
  # dockerではお掃除が必要
  gem 'database_cleaner'
end

group :production do
  # awsのs3使用
  gem 'aws-sdk-s3', require: false
  # 何人アクセスしたかとか分析してくれるやつ
  gem 'google-analytics-rails'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
