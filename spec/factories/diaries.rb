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
FactoryBot.define do
  factory :diary, class: 'Diary' do
    date { Time.zone.today }
    content { 'テストcontent' }
    association :user, factory: :user

    trait :add_picture do
      picture {
        Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/test.jpg'))
      }
    end
  end
end
