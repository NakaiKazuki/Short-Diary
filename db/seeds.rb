# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
password = SecureRandom.urlsafe_base64
User.create!(
  id: 1,
  name: 'ゲストユーザ',
  email: 'guest@example.com',
  password: password,
  password_confirmation: password,
  confirmed_at: Time.current
)

50.times do |m|
  Diary.create!(
    date: Time.zone.today - m,
    content: "サンプル投稿-#{m}",
    created_at: Time.zone.today - m,
    tag_list: ['サンプルTag1', 'サンプルTag2', 'サンプルTag3'],
    user_id: 1
  )
end

Diary.create!(
  date: Time.zone.today,
  content: '0123456789' * 20,
  created_at: Time.zone.today,
  tag_list: [],
  user_id: 1
)

Diary.create!(
  date: Time.zone.today,
  content: 'あいうえおかきくけこ' * 20,
  created_at: Time.zone.today,
  tag_list: [],
  user_id: 1
)