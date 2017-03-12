class RetrospectivesChannel < ApplicationChannel
  def open
    return unless authenticate_retrospective?
    broadcast_to(type: 'SET_RETROSPECTIVE', retrospective: ActiveModelSerializers::SerializableResource.new(@retrospective).as_json)
  end

  private

  def broadcast_class
    RetrospectivesChannel
  end
end
