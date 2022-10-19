# frozen_string_literal: true

# == Schema Information
#
# Table name: diaries
#
#  id           :bigint           not null, primary key
#  content      :text(65535)      not null
#  date         :date             not null
#  movie_source :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_diaries_on_date_and_user_id_and_created_at  (date,user_id,created_at)
#  index_diaries_on_user_id                          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Diary < ApplicationRecord
  include Rails.application.routes.url_helpers
  acts_as_taggable_on :tags
  belongs_to :user
  has_one_attached :picture
  default_scope { order(date: :desc, created_at: :desc) }

  validates :date,
            presence: true
  validates :content,
            presence: true,
            length: { maximum: 200 }
  validate :validate_picture

  validates :movie_source,
            length: { maximum: 255 }

  def picture_url
    # 紐づいている画像のURLを取得する
    picture.attached? ? url_for(picture) : nil
  end

  private

  # 画像の拡張子とサイズの制限をしている
    def validate_picture
      return unless picture.attached?

      if !picture.content_type.in?(%('image/jpeg image/jpg image/png image/gif'))
        errors.add(:picture, 'はjpeg, jpg, png, gif以外の投稿ができません')
      elsif picture.blob.byte_size > 5.megabytes
        errors.add(:picture, 'の最大サイズは5MBです')
      end
    end
end
