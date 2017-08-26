class LocationHistory < ApplicationRecord
  acts_as_geolocated
  belongs_to :user

  scope :latest_for_each_user, ->(selection) {
    q = order(user_id: :asc, created_at: :desc)
    if selection
      q.pluck(%(DISTINCT ON ("location_histories"."user_id") #{selection}))
    else
      q.select('DISTINCT ON ("location_histories"."user_id") "location_histories".*')
    end
  }

  def self.within_radius_from(radius, point)
    self.within_raduis(radius, point.lat, point.lng)
  end
end
