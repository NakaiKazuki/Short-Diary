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
require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:contact) { create(:contact) }

  describe 'Contact' do
    it '有効' do
      expect(contact).to be_valid
    end
  end

  describe 'name' do
    it '空白は無効' do
      contact.name = nil
      expect(contact).to be_invalid
    end

    it '51文字以上は無効' do
      contact.name = 'a' * 51
      expect(contact).to be_invalid
    end

    it '50文字以下は有効' do
      contact.name = 'a' * 50
      expect(contact).to be_valid
    end
  end

  describe 'email' do
    it '空白は無効' do
      contact.email = ' '
      expect(contact).to be_invalid
    end

    it '256文字以上は無効' do
      contact.email = "#{'a' * 244}@example.com"
      expect(contact).to be_invalid
    end

    it '255文字以下は有効' do
      contact.email = "#{'a' * 243}@example.com"
      expect(contact).to be_valid
    end
  end

  describe 'over_view' do
    it '空白は無効' do
      contact.over_view = ' '
      expect(contact).to be_invalid
    end

    it '51文字以上は無効' do
      contact.over_view = 'a' * 51
      expect(contact).to be_invalid
    end

    it '50文字以下は有効' do
      contact.over_view = 'a' * 50
      expect(contact).to be_valid
    end
  end

  describe 'content' do
    it '空白は無効' do
      contact.content = nil
      expect(contact).to be_invalid
    end

    it '1001文字以上は無効' do
      contact.content = 'a' * 1001
      expect(contact).to be_invalid
    end

    it '1000文字以下は有効' do
      contact.content = 'a' * 1000
      expect(contact).to be_valid
    end
  end
end
