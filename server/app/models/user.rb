class User < ApplicationRecord
  has_many :location_histories

  def self.find_or_create_from_fb(access_token)
    long_lived_token = Koala::Facebook::OAuth.new.exchange_access_token_info(access_token)['access_token']
    graph = Koala::Facebook::API.new(long_lived_token)
    data = graph.get_object('me', {fields: 'first_name,last_name'})

    user = User.find_or_initialize_by(fb_id: data['id'])
    user.assign_attributes(
      first_name: data['first_name'],
      last_name: data['last_name'],
      fb_token: long_lived_token,
    )

    user.save! if user.changed?
    user
  end
end
