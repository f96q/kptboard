class RetrospectiveSerializer < ActiveModel::Serializer
  attributes :id, :labels
  has_many :users

  def labels
    {}.tap { |r|
      Label::TYPE.keys.each { |typ|
        r[typ] = object.labels.label_typ(typ).map { |label| LabelSerializer.new(label).attributes }
      }
    }
  end
end
