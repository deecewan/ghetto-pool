class AddDepartAtToTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :depart_at, :timestamp
    Trip.update_all(depart_at: Time.zone.now)
    change_column_null :trips, :depart_at, false
  end
end
