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

ActiveRecord::Schema.define(version: 20170826031501) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "location_histories", force: :cascade do |t|
    t.bigint "user_id"
    t.float "lat", null: false
    t.float "lng", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "ll_to_earth(lat, lng)", name: "location_histories_earthdistance_ix", using: :gist
    t.index ["user_id", "created_at"], name: "index_location_histories_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_location_histories_on_user_id"
  end

  create_table "trip_passengers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "trip_id", null: false
    t.boolean "accepted", default: false, null: false
    t.index ["trip_id"], name: "index_trip_passengers_on_trip_id"
    t.index ["user_id"], name: "index_trip_passengers_on_user_id"
  end

  create_table "trips", force: :cascade do |t|
    t.bigint "user_id"
    t.string "destination", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "fb_id", null: false
    t.string "fb_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fb_id"], name: "index_users_on_fb_id"
  end

end
