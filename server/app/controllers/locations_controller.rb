class LocationsController < ApplicationController
  before_action :authorize

  def current
    current_user.location_histories.create!(params.require(:data).permit(:lat, :lng))

    head :ok
  end

  def get_locations
    locations = LocationHistory.where(user_id: User.where(fb_id: (current_user.fb_friend_ids + [current_user.fb_id]) & params[:fb_user_ids].split(',')).select(:id))
      .latest_for_each_user
      .joins(:user).preload(:user)

    mapped_locations = locations.map do |l|
      {
        id: l.user.fb_id,
        lat: l.lat,
        lng: l.lng,
      }
    end

    render json: { locations: mapped_locations }
  end
end
