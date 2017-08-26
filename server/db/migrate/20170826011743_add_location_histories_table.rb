class AddLocationHistoriesTable < ActiveRecord::Migration[5.1]
  def up
    create_table :location_histories do |t|
      t.references :user
      t.float :lat
      t.float :lng
      t.timestamps
    end
    add_earthdistance_index :location_histories
    add_index :location_histories, [:user_id, :created_at]
  end

  def down
    drop_table :location_histories
  end
end
