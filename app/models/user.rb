# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  allow_password_change  :boolean          default(FALSE)
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string(255)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  image                  :string(255)
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string(255)
#  name                   :string(255)      default(""), not null
#  provider               :string(255)      default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  sign_in_count          :integer          default(0), not null
#  tokens                 :text(65535)
#  uid                    :string(255)      default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#
class User < ApplicationRecord
  # Devise
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, :rememberable,
         :trackable, :timeoutable
  #  ,:confirmable, :lockable, :omniauthables
  include DeviseTokenAuth::Concerns::User

  # 登録前にメールアドレスを小文字に変換
  before_save :downcase_email

  # バリデーション
  validates :email,
            presence: true,
            length: { maximum: 255 }

  validates :name,
            presence: true,
            length: { maximum: 50 }

  def self.guest
    find_or_create_by!(email: 'guest@example.com') do |user|
      user.name = 'ゲストユーザ'
      user.password = SecureRandom.urlsafe_base64
      # user.confirmed_at = Time.current # メール認証使用時はコメントアウト
    end
  end

  private

    # 登録前にメールアドレスを小文字に変換
    def downcase_email
      email.downcase!
    end
end
