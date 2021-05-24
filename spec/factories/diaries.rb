# frozen_string_literal: true

# == Schema Information
#
# Table name: diaries
#
#  id         :bigint           not null, primary key
#  content    :text(65535)      not null
#  date       :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
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
FactoryBot.define do
  factory :diary, class: 'Diary' do
    date { Time.zone.today }
    content { 'テストcontent' }
    tag_list { %w[factoryTag1 factoryTag2] }
    association :user, factory: :user

    trait :add_picture do
      picture {
        Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/test.jpg'))
      }
    end
  end
end
