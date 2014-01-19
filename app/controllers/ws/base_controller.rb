class Ws::BaseController < WebsocketRails::BaseController
  before_action :set_retrospective
  before_action :authorize
  attr_accessor :response_body

  def set_retrospective
    id = event.data[:retrospective_id]
    @channel_name = "retrospective-#{id}"
    @retrospective = Retrospective.where(id: id).first
  end

  def trigger_channel(name, data)
    WebsocketRails[@channel_name].trigger name, data
  end

  def authorize
    unless current_user
      trigger_failure 'sign out user'
      self.response_body = true
      return
    end
    unless @retrospective.has_user? current_user.id
      trigger_failure 'authorization failed'
      self.response_body = true
      return
    end
  end
end
