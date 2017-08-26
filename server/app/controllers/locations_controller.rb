class LocationsController < ApplicationController
  before_action :authorize

  def current
    current_user.location_histories.create!(params.require(:data).permit(:lat, :lng))

    head :ok
  end
end
