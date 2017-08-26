class AddFbIdIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :users, :fb_id
  end
end
