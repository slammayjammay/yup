class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.float   :rating,      null: false
      t.string  :excerpt,     null: false
      t.string  :business_id, null: false
      t.integer :user_id,     null: false

      t.timestamps null: false
    end

    add_index :reviews, :business_id
    add_index :reviews, :user_id
  end
end
