json.(@retrospective, :id)

json.users @retrospective.users, :id, :name

json.labels do
  Label.kinds.keys.each do |kind|
    json.set! kind do
      json.array! @retrospective.labels.where(kind: kind) do |label|
        json.partial! 'channels/label', label: label
      end
    end
  end
end
