class CreateDiaries < ActiveRecord::Migration[6.1]
  def change
    create_table :diaries do |t|
      t.date :date
      t.text :content, null: false
      t.string :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :diaries, [:user_id, :date]
  end
end
