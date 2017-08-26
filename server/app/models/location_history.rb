class LocationHistory < ApplicationRecord
  acts_as_geolocated
  belongs_to :user

  def self.within_radius_from(radius, point)
    self.within_raduis(radius, point.lat, point.lng)
  end
end
