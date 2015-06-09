class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :location
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :image_url

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token
  end
end
