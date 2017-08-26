Rails.application.routes.draw do
  scope :api do
    # Locations
    scope :locations do
      post :current, to: 'locations#current'
    end

    # Auth
    post :login, to: 'sessions#login'
    delete :logout, to: 'sessions#logout'

    post :log, to: 'logs#log'
  end
end
