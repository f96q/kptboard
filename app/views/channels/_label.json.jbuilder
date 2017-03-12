json.(label, :id, :typ, :position, :description)
json.created_at label.created_at.strftime('%m-%d')
json.user_name label.user.try(:name)
