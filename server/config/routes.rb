Rails.application.routes.draw do
  scope :api do
    # Locations
    scope :locations do
      post :current, to: 'locations#current'
      get '/', to: 'locations#get_locations'
    end

    scope :trips do
      get '/', to: 'travel#trips'
      get '/journeys', to: 'travel#journeys'
      post '/', to: 'travel#create'
      put ':id/invite', to: 'travel#invite'
      post ':id/accept', to: 'travel#accept'
    end

    # Auth
    post :login, to: 'sessions#login'
    delete :logout, to: 'sessions#logout'

    post :log, to: 'logs#log'
  end
end
