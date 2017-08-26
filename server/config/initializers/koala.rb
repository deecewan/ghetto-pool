Koala.configure do |config|
  config.app_id = Rails.application.secrets.facebook_app_id
  config.app_secret = Rails.application.secrets.facebook_app_secret
  config.oauth_callback_url = Rails.application.secrets.facebook_oauth_callback_url
end

Koala.http_service.http_options = { :ssl => { :verify => false } }
