Rails.application.routes.draw do
  scope :api do
    post :login, to: 'sessions#login'
    delete :logout, to: 'sessions#logout'

    post :log, to: 'logs#log'
  end
end
