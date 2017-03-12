class RetrospectivesChannel < ApplicationChannel
  def open
    return unless authenticate_retrospective?
    retrospective = ApplicationController.render('channels/retrospective', assigns: { retrospective: @retrospective })
    broadcast_to(type: 'SET_RETROSPECTIVE', retrospective: JSON.parse(retrospective))
  end

  private

  def broadcast_class
    RetrospectivesChannel
  end
end
