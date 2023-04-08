# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.0'

gem 'acts-as-taggable-on' # タグ機能
gem 'bootsnap', require: false
gem 'devise' # User関連
gem 'devise_token_auth' # User関連
gem 'fast_blank' # 取り敢えず入れとく
gem 'mysql2'
gem 'pagy', '~> 4' # ページネーション
gem 'puma'
gem 'rack-attack' # DOS攻撃対策
gem 'rack-cors' # apiで使うのに必要なやつ
gem 'rails', '~> 7.0.4'
gem 'rails-i18n' # 日本語化
gem 'ransack', '~> 3' # 検索

group :development, :test do
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
  gem 'google-analytics-rails' # 何人アクセスしたかとか分析してくれるやつ
  gem 'staccato'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
