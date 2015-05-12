class Ws::TimerController < Ws::BaseController
  skip_before_action :set_retrospective, only: [:update]
  skip_before_action :authorize, only: [:update]

  def start
    trigger_channel('timer.start', {time: event.data[:time]})
  end

  def clear
    trigger_channel('timer.clear', {})
  end

  def update
    WebsocketRails["retrospective-#{event.data[:retrospective_id]}"].trigger('timer.update', {time: event.data[:time]})
  end
end
