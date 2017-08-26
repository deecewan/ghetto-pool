class TravelController < ApplicationController
  before_action :authorize

  def create
    p = params.require(:data)
    location = current_user.location_histories.create!(p.permit(:lat, :lng))

    invitable_fb_ids = LocationHistory
        .joins(:user)
        .merge(User.where(fb_id: current_user.fb_friend_ids))
        .within_radius_from(1000, location)
        .latest_for_each_user('"users"."fb_id"')

    if p[:destination].blank?
      head :bad_request
      return
    end

    trip = current_user.trips.create!(p.permit(:destination))

    render json: { trip_id: trip.id, inviteable_facebook_ids: invitable_fb_ids }
  end

  def invite_friends
    trip = current_user.trips.find_by(id: params[:id])
    fb_ids = current_user.fb_friend_ids & params.require(:data).fetch(:invited_facebook_id, [])
    trip.passengers = User.find_by(fb_id: fb_ids)
    head :ok
  end

  def accept
    tp = current_user.trip_passengers.where(trip_id: params[:id])
    tp.update_attributes(accepted: true)
    head :ok
  end
end
