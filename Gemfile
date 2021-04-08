# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.1'

gem 'bootsnap', require: false
gem 'devise' # User関連
gem 'devise_token_auth' # User関連
gem 'fast_blank' # 取り敢えず入れとく
gem 'mini_magick' # 画像
gem 'mysql2'
gem 'pagy' # ページネーション
gem 'puma'
gem 'rack-attack' # F5アタック対策
gem 'rack-cors' # apiで使うのに必要なやつ
gem 'rails', '~> 6.1.3'
gem 'rails-i18n' # 日本語化

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails' # テスト用
  gem 'faker' # テスト用
  gem 'rspec-rails' # テスト用
end

group :development do
  gem 'annotate' # モデルの内容を分かりやすく
  gem 'better_errors' # エラー画面を見やすく
  gem 'binding_of_caller' # エラー画面を見やすく
  gem 'brakeman', require: false # セキュリティ云々を指摘してくれる
  gem 'bullet' # N+1問題を検出
  gem 'bundler-audit' # ライブラリのセキュリティ云々を指摘してくれる
  gem 'letter_opener' # メール確認用
  gem 'letter_opener_web' # メール確認用
  gem 'listen'
  gem 'rails_best_practices', require: false # railsのベストプラクティスに則っているかをチェック
  gem 'rubocop', require: false # rubocop関連
  gem 'rubocop-performance', require: false # rubocop関連
  gem 'rubocop-rails', require: false # rubocop関連
  gem 'rubocop-rspec' # rubocop関連
  gem 'spring'
end

group :test do
  gem 'database_cleaner' # DockerではDBのお掃除が必要
end

group :production do
  gem 'aws-sdk-s3', require: false # awsのs3使用
  # gem 'google-analytics-rails' # 何人アクセスしたかとか分析してくれるやつ
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
