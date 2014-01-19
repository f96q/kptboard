class Ws::RetrospectivesController < Ws::BaseController
  def open
    trigger_success labels: @retrospective.labels.empty? ? [] : @retrospective.labels.map(&:as_json)
  end

  def add_user
    @user = User.where(email: event.data[:email]).first
    unless @user
      trigger_failure 'not found user'
      return
    end
    @retrospective.add_user! @user.id
    trigger_channel 'users.create', @user.as_json
  end

  def remove_user
    unless @retrospective.has_user? event.data[:id]
      trigger_failure 'have not user'
      return
    end
    @user = User.where(id: event.data[:id]).first
    @retrospective.remove_user @user.id
    trigger_channel 'users.destroy', {id: @user.id}
  end
end
