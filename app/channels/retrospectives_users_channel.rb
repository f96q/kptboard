class RetrospectivesUsersChannel < ApplicationChannel
  def create(data)
    return unless authenticate_retrospective?
    @user = User.find_by(email: data['email'])
    unless @user
      broadcast_to(type: 'SET_ALERT', alert: { type: 'error', messages: [I18n.t('channels.retrospectives.not_found_user')] })
      return
    end
    if RetrospectivesUser.create(retrospective: @retrospective, user: @user)
      broadcast_to(type: 'ADD_USER', user: @user.as_json)
    else
      broadcast_to(type: 'SET_ALERT', alert: { type: 'error', messages: @retrospectives_user.errors.full_messages })
    end
  end

  def destroy(data)
    return unless authenticate_retrospective?
    @retrospectives_user = RetrospectivesUser.find_by(retrospective: @retrospective, user_id: data['id'])
    @retrospectives_user.destroy
    broadcast_to(type: 'REMOVE_USER', id: data['id'])
  end

  private

  def broadcast_to(data = {})
    RetrospectivesUsersChannel.broadcast_to(params[:room], data)
  end
end
