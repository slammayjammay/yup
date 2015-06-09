class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :location, null: false
      t.string :url
      t.integer :phone
      t.integer :image_url

      t.timestamps null: false
    end
  end
end
