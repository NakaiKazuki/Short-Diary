# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(
  id: 1,
  name: 'ゲストーザ',
  email: 'guest@example.com',
  password: 'password',
  password_confirmation: 'password',
  # confirmed_at: Time.current
)

20.times do |m|
  Diary.create!(
    date: Time.zone.today - m,
    content: "サンプル投稿-#{m}",
    created_at: Time.zone.today - m,
    user_id: 1
  )
end