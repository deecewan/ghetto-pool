Rails.application.routes.draw do
  scope :api do
    post :login, to: 'sessions#login'
  end
end
