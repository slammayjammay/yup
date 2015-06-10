class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :url
      t.integer :phone
      t.integer :image_url

      t.timestamps null: false
    end
  end
end
