class LogsController < ApplicationController
  def log
    Rails.logger.info("#{(params[:severity].presence || 'info').upcase}: #{params[:data]}")
    head :ok
  end
end
