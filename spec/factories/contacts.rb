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
FactoryBot.define do
  factory :contact, class: 'Contact' do
    name { 'テストname' }
    email { 'test@example.com' }
    over_view { 'テスト' }
    content { 'テストcontent' }
  end
end
