class TravelController < ApplicationController
  before_action :authorize

  def trips
    trips = current_user.trips.joins(trip_passengers: :user).preload(:trip_passengers, trip_passengers: :user).uniq
    trips = trips.map do |t|
      {
        id: t.id,
        user_id: current_user.fb_id,
        destination: t.destination,
        depart_at: t.depart_at.to_i,
        passengers: t.trip_passengers.map do |tp|
          {
            id: tp.user.fb_id,
            first_name: tp.user.first_name,
            last_name: tp.user.last_name,
            accepted: tp.accepted,
          }
        end,
      }
    end

    render json: { trips: trips }
  end

  def journeys
    tps = TripPassenger.where(user_id: current_user.id).joins(trip: [:user, {trip_passengers: :user}])
              .preload(:trip, trip: [:user, { trip_passengers: :user }])

    trips = tps.map(&:trip).map do |t|
      {
          id: t.id,
          user_id: t.user.fb_id,
          destination: t.destination,
          depart_at: t.depart_at.to_i,
          passengers: t.trip_passengers.map do |tp|
            {
                id: tp.user.fb_id,
                first_name: tp.user.first_name,
                last_name: tp.user.last_name,
                accepted: tp.accepted,
            }
          end,
      }
    end

    render json: { trips: trips }
  end

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

    trip = current_user.trips.create!(destination: p[:destination], depart_at: Time.zone.at(p[:depart_at]))

    render json: { trip_id: trip.id, inviteable_facebook_ids: invitable_fb_ids }
  end

  def invite_friends
    trip = current_user.trips.find_by(id: params[:id])
    fb_ids = current_user.fb_friend_ids & params.require(:data).fetch(:invited_facebook_ids, [])
    trip.passengers = User.find_by(fb_id: fb_ids)
    head :ok
  end

  def accept
    tp = current_user.trip_passengers.where(trip_id: params[:id])
    tp.update_attributes(accepted: true)
    head :ok
  end
end
