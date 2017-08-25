class SessionController < ApplicationController
  def login
    p = params.permit(:accessToken, :expiresIn, :userID)

    graph = Koala::Facebook::API.new(p[:accessToken])

    begin
      unless graph.get_object('me')['id'] == p[:userId]
        auth_failure
        return
      end
    rescue Koala::Facebook::AuthenticationError
      auth_failure
      return
    end

    user = User.find_or_create_from_fb(p[:accessToken])
    session[:user_id] = user.id
    redirect_to('/')
  end

  private
  def auth_failure

  end
end
