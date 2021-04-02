# == Schema Information
#
# Table name: diaries
#
#  id         :bigint           not null, primary key
#  content    :text(65535)      not null
#  date       :date
#  image      :string(255)
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
  belongs_to :user
  has_one_attached :image
  default_scope { order(created_at: :desc) }

  validates :date,
            presence: true
  validates :content,
            presence: true,
            length: { maximum: 200 }
  validates :user_id,
            presence: true
  validate :validate_image

  # def self.resize_image(image)
  #   image.variant(resize: '300x300').processed
  # end

  # 画像の拡張子とサイズの制限をしている
  def validate_image
    return unless image.attached?

    if !image.content_type.in?(%('image/jpeg image/jpg image/png image/gif'))
      errors.add(:image, 'はjpeg, jpg, png, gif以外の投稿ができません')
    elsif image.blob.byte_size > 5.megabytes
      errors.add(:image, 'のサイズが5MBを超えています')
    end
  end
end
