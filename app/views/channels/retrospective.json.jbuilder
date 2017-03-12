json.(@retrospective, :id)

json.users @retrospective.users, :id, :name

json.labels do
  Label.typs.keys.each do |typ|
    json.set! typ do
      json.array! @retrospective.labels.where(typ: typ) do |label|
        json.partial! 'channels/label', label: label
      end
    end
  end
end
