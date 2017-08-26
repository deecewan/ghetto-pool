class NotNullApplicableColumns < ActiveRecord::Migration[5.1]
  def up
    change_column_null :users, :fb_id, false
    change_column_null :users, :fb_token, false
    change_column_null :location_histories, :lat, false
    change_column_null :location_histories, :lng, false
  end

  def down
    change_column_null :users, :fb_id, true
    change_column_null :users, :fb_token, true
    change_column_null :location_histories, :lat, true
    change_column_null :location_histories, :lng, true
  end
end
