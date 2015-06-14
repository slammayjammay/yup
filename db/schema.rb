# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150614185431) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: :cascade do |t|
    t.string   "name",                       null: false
    t.float    "rating",       default: 0.0, null: false
    t.integer  "review_count", default: 0,   null: false
    t.string   "category",                   null: false
    t.string   "address",                    null: false
    t.string   "city",                       null: false
    t.string   "state",                      null: false
    t.float    "latitude",                   null: false
    t.float    "longitude",                  null: false
    t.string   "url"
    t.string   "phone"
    t.string   "image_url"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "followings", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followed_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.float    "rating",      null: false
    t.string   "content",     null: false
    t.integer  "business_id", null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "reviews", ["business_id"], name: "index_reviews_on_business_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                                                                                                               null: false
    t.string   "last_name",                                                                                                                null: false
    t.string   "email",                                                                                                                    null: false
    t.string   "password_digest",                                                                                                          null: false
    t.string   "session_token",                                                                                                            null: false
    t.string   "image_url",       default: "https://s-media-cache-ak0.pinimg.com/originals/2b/ed/51/2bed513bc5f13733cf9a8a12c4e1a971.gif", null: false
    t.datetime "created_at",                                                                                                               null: false
    t.datetime "updated_at",                                                                                                               null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
