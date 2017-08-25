class LogsController < ApplicationController
  def log
    Rails.logger.info("CLIENT LOG - #{(params[:severity].presence || 'info').upcase}: #{params[:data]}")
    head :ok
  end
end
