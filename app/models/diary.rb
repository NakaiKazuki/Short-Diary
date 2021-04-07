# == Schema Information
#
# Table name: diaries
#
#  id         :bigint           not null, primary key
#  content    :text(65535)      not null
#  date       :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_diaries_on_user_id           (user_id)
#  index_diaries_on_user_id_and_date  (user_id,date)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Diary < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_one_attached :picture
  default_scope { order(created_at: :desc) }

  validates :date,
            presence: true
  validates :content,
            presence: true,
            length: { maximum: 200 }
  validates :user_id,
            presence: true
  validate :validate_picture

  def picture_url
    # 紐づいている画像のURLを取得する
    picture.attached? ? url_for(picture) : nil
  end

  # 画像の拡張子とサイズの制限をしている
  def validate_picture
    return unless picture.attached?

    if !picture.content_type.in?(%('image/jpeg image/jpg image/png image/gif'))
      errors.add(:picture, 'はjpeg, jpg, png, gif以外の投稿ができません')
    elsif picture.blob.byte_size > 5.megabytes
      errors.add(:picture, 'のサイズを5MB以下にして再度投稿してください')
    end
  end
end
