Koala.configure do |config|
  config.app_id = Rails.application.secrets.facebook_app_id
  config.app_secret = Rails.application.secrets.facebook_app_secret
  config.oauth_callback_url = "http://#{Rails.application.secrets.app_host_url}/auth/facebook/callback"
end
