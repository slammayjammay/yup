class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :image_url, null: false, default: "https://s-media-cache-ak0.pinimg.com/originals/2b/ed/51/2bed513bc5f13733cf9a8a12c4e1a971.gif"

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
