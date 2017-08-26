class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_passengers
  has_many :passengers, through: :trip_passengers, source: :user
end
