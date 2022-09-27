class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :over_view, null: false
      t.string :content, null: false

      t.timestamps
    end
  end
end
