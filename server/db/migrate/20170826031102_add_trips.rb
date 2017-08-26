class AddTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.references :user
      t.string :destination, null: false
      t.timestamps
    end

    create_table :trip_passengers do |t|
      t.references :user, null: false
      t.references :trip, null: false
      t.boolean :accepted, null: false, default: false
    end
  end
end
