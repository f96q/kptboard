class RetrospectivesChannel < ApplicationChannel
  def open
    return unless authenticate_retrospective?
    RetrospectivesChannel.broadcast_to(params[:room], {
      type: 'SET_RETROSPECTIVE',
      retrospective: ActiveModelSerializers::SerializableResource.new(@retrospective).as_json
    })
  end

  def add_user(data)
    return unless authenticate_retrospective?
    @user = User.where(email: data['email']).first
    unless @user
      RetrospectivesChannel.broadcast_to(params[:room], {
        type: 'SET_ALERT',
        alert: {
          type: 'error',
          messages: [I18n.t('channels.retrospectives.not_found_user')]
        }
      })
      return
    end
    @retrospective.add_user!(@user.id)
    RetrospectivesChannel.broadcast_to(params[:room], {
      type: 'ADD_USER',
      user: @user.as_json
    })
  end

  def remove_user(data)
    return unless authenticate_retrospective?
    return unless @retrospective.has_user?(data['id'])
    @retrospective.remove_user(data['id'])
    RetrospectivesChannel.broadcast_to(params[:room], {
      type: 'REMOVE_USER',
      id: data['id']
    })
  end
end
