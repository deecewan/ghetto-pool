Rails.application.routes.draw do
  scope :api do
    post :login, to: 'sessions#login'
    post :log, to: 'logs#log'
  end
end
