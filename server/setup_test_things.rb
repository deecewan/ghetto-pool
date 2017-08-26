test_users = Koala::Facebook::TestUsers.new(:app_id => 1294002067394727, :secret => "de134b5301b5ce1bd274dcae3a5b0de3")

friends = []

(1..10).each do
  fb_user = test_users.create(true, "public_profile,user_friends")

  friends << fb_user

  test = Koala::Facebook::API.new(fb_user["access_token"]).get_object('me', {fields: 'first_name,last_name'})

  user = User.create(fb_id: fb_user["id"], fb_token: fb_user["access_token"], first_name: test["first_name"], last_name: test["last_name"])
  user.location_histories.create(lat: 1, lng: 1)
end

first_friend = friends.shift
ap first_friend

friends.map{|f| test_users.befriend(first_friend, f)}
