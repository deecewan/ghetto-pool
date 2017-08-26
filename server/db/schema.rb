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

ActiveRecord::Schema.define(version: 20170826011743) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "location_histories", force: :cascade do |t|
    t.bigint "user_id"
    t.float "lat"
    t.float "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "ll_to_earth(lat, lng)", name: "location_histories_earthdistance_ix", using: :gist
    t.index ["user_id", "created_at"], name: "index_location_histories_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_location_histories_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "fb_id"
    t.string "fb_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
