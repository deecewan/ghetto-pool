class ApplicationController < ActionController::API
  private
  def current_user
    return nil if session[:user_id].blank?
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def has_session?
    current_user.present?
  end

  def authorize
    render(json: { error: 'no backend session' }, status: 401) unless has_session?
  end
end
