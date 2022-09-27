# frozen_string_literal: true

# == Schema Information
#
# Table name: contacts
#
#  id         :bigint           not null, primary key
#  content    :string(255)      not null
#  email      :string(255)      not null
#  name       :string(255)      not null
#  over_view  :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Contact < ApplicationRecord
  validates :name,
            presence: true,
            length: { maximum: 50 }
  validates :email,
            presence: true,
            length: { maximum: 255 }
  validates :over_view,
            presence: true,
            length: { maximum: 50 }
  validates :content,
            presence: true,
            length: { maximum: 1000 }
end
