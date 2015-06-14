class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.float  :rating, null: false, default: 0
      t.integer :review_count, null: false, default: 0
      t.string :category, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :url
      t.string :phone
      t.string :image_url

      t.timestamps null: false
    end
  end
end
