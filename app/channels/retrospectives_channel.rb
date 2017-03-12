class RetrospectivesChannel < ApplicationChannel
  def open
    return unless authenticate_retrospective?
    RetrospectivesChannel.broadcast_to(params[:room], {
      type: 'SET_RETROSPECTIVE',
      retrospective: ActiveModelSerializers::SerializableResource.new(@retrospective).as_json
    })
  end
end
