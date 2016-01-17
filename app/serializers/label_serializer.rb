class LabelSerializer < ActiveModel::Serializer
  attributes :id, :typ, :position, :description, :user_name, :created_at

  def created_at
    object.created_at.strftime('%m-%d')
  end

  def user_name
    object.user.try(:name)
  end
end
