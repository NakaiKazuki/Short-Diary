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
#  index_diaries_on_date_and_user_id_and_created_at  (date,user_id,created_at)
#  index_diaries_on_user_id                          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Diary, type: :model do
  let(:user) { create(:user) }
  let(:diary) { create(:diary, user: user) }

  describe 'Diary' do
    it '有効' do
      expect(diary).to be_valid
    end

    it '投稿日が新しい投稿が最初に来る' do
      date = Time.zone.today
      3.times do |m|
        create(:diary, user: user, created_at: date - m - 1)
      end
      diary4 = create(:diary, user: user, created_at: date)
      expect(Diary.first).to eq diary4
    end
  end

  describe 'date' do
    it '空白は無効' do
      diary.date = nil
      expect(diary).to be_invalid
    end
  end

  describe 'content' do
    it '空白は無効' do
      diary.content = nil
      expect(diary).to be_invalid
    end

    it '201文字以上は無効' do
      diary.content = 'a' * 201
      expect(diary).to be_invalid
    end

    it '200文字以下は有効' do
      diary.content = 'a' * 200
      expect(diary).to be_valid
    end
  end

  describe 'user_id' do
    it '空白は無効' do
      diary.user_id = nil
      expect(diary).to be_invalid
    end

    it '有効' do
      diary.user_id = user.id
      expect(diary).to be_valid
    end
  end

  describe 'picture' do
    it '5mbより大きいファイルは無効' do
      diary.picture.attach(io: File.open(Rails.root.join('spec/fixtures/images/test_6mb.jpg')),
                           filename: 'test_6mb.jpg', content_type: 'image/jpg')
      expect(diary).to be_invalid
    end

    it '画像ファイル以外は無効' do
      diary.picture.attach(io: File.open(Rails.root.join('spec/fixtures/images/test.pdf')),
                           filename: 'test.pdf', content_type: 'application/pdf')
      expect(diary).to be_invalid
    end

    it '5mb以下の画像ファイルは有効' do
      diary.picture.attach(io: File.open(Rails.root.join('spec/fixtures/images/test.jpg')),
                           filename: 'test.jpg', content_type: 'image/jpg')
      expect(diary).to be_valid
    end
  end

  describe 'アソシエーション' do
    before do
      diary.save
    end

    it '関連するユーザー削除と同時に削除' do
      expect {
        user.destroy
      }.to change(Diary, :count).by(-1)
    end
  end
end
