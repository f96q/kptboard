class RetrospectiveSerializer < ActiveModel::Serializer
  attributes :id, :labels
  has_many :users

  def labels
    {}.tap { |r|
      Label.typs.keys.each { |typ|
        r[typ] = object.labels.where(typ: typ).map { |label| LabelSerializer.new(label).attributes }
      }
    }
  end
end
