class HealthCheckController < ApplicationController
  def health_check
    head :ok
  end
end
