Rails.application.routes.draw do
  scope :api do
    # Locations
    scope :locations do
      post :current, to: 'locations#current'
    end

    scope :trips do
      post '/', to: 'travel#create'
      put ':id/invite', to: 'travel#invite_friends'
      post ':id/accept', to: 'travel#accept'
    end

    # Auth
    post :login, to: 'sessions#login'
    delete :logout, to: 'sessions#logout'

    post :log, to: 'logs#log'
  end
end
