class ChangeDataContentToContacts < ActiveRecord::Migration[7.0]
  def change
    change_column :contacts, :content, :text
  end
end