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
require 'rails_helper'

RSpec.describe Diary do
  let(:user) { create(:user) }
  let(:diary) { create(:diary, user:) }

  describe 'Diary' do
    it '有効' do
      expect(diary).to be_valid
    end

    it '日付が新しい投稿が最初に来る' do
      date = Time.zone.today
      3.times do |m|
        create(:diary, user:, date: date - m - 1)
      end
      diary4 = create(:diary, user:, date:)
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

  describe 'tag_list' do
    it '有効(空配列)' do
      diary.tag_list = []
      expect(diary).to be_valid
    end

    it '有効(値あり(配列))' do
      diary.tag_list = ['testTag']
      expect(diary).to be_valid
    end
  end

  describe 'picture' do
    it '5mbより大きいファイルは無効' do
      diary.picture.attach(io: Rails.root.join('spec/fixtures/images/test_6mb.jpeg').open,
                           filename: 'test_6mb.jpeg', content_type: 'image/jpeg')
      expect(diary).to be_invalid
    end

    it '画像ファイル以外は無効' do
      diary.picture.attach(io: Rails.root.join('spec/fixtures/images/test.pdf').open,
                           filename: 'test.pdf', content_type: 'application/pdf')
      expect(diary).to be_invalid
    end

    it '5mb以下の画像ファイルは有効' do
      diary.picture.attach(io: Rails.root.join('spec/fixtures/images/test.jpeg').open,
                           filename: 'test.jpeg', content_type: 'image/jpeg')
      expect(diary).to be_valid
    end
  end

  describe 'movie_source' do
    it '256文字以上は無効' do
      diary.movie_source = 'a' * 256
      expect(diary).to be_invalid
    end

    it '255文字以下は有効' do
      diary.movie_source = 'a' * 255
      expect(diary).to be_valid
    end

    it '空白でも無効' do
      diary.movie_source = nil
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
