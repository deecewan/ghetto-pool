class AddTransportMethod < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :transport_method, :string
  end
end
