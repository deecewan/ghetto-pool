class SessionsController < ApplicationController
  before_action :authorize, only: [:logout]

  def login
    p = params.require(:data).permit(:accessToken, :expiresIn, :userID)

    graph = Koala::Facebook::API.new(p[:accessToken])

    begin
      unless graph.get_object('me')['id'] == p[:userID]
        auth_failure
        return
      end
    rescue Koala::Facebook::AuthenticationError
      auth_failure
      return
    end

    user = User.find_or_create_from_fb(p[:accessToken])

    session[:user_id] = user.id
    render(json: { access_token: user.fb_token, user_id: user.fb_id })
  end

  def logout
    session[:user_id] = nil
    head :ok
  end

  private
  def auth_failure
    render json: { error: 'you failed' }, status: 400
  end
end
