class LabelsChannel < ApplicationChannel
  def create(data)
    return unless authenticate_retrospective?
    @label = Label.new(data['label'].to_h.tap {|params| params.merge!(user_id: current_user.id, retrospective_id: @retrospective.id) })
    Label.transaction do
      @label.save!
      @label.insert_at 1
      LabelsChannel.broadcast_to(params[:room], {
        type: 'CREATE_LABEL',
        label: ActiveModelSerializers::SerializableResource.new(@label).as_json
      })
    end
  end

  def destroy(data)
    return unless authenticate_retrospective?
    set_label(data)
    @label.destroy
    LabelsChannel.broadcast_to(params[:room], {
      type: 'DESTROY_LABEL',
      id: @label.id
    })
  end

  def update(data)
    return unless authenticate_retrospective?
    set_label(data)
    @label.update(data['label'])
    LabelsChannel.broadcast_to(params[:room], {
      type: 'UPDATE_LABEL',
      id: @label.id,
      label: data['label']
    })
  end

  def position(data)
    return unless authenticate_retrospective?
    set_label(data)
    Label.transaction do
      if @label.typ != data['typ']
        @label.remove_from_list
        @label.update!(typ: data['typ'])
      end
      @label.insert_at(data['position'].to_i)
    end
    LabelsChannel.broadcast_to(params[:room], {
      type: 'DROP_LABEL',
      id: @label.id,
      typ: @label.typ,
      index: @label.position - 1
    })
  end

  private

  def set_label(data)
    @label = @retrospective.labels.find_by(id: data['id'])
  end
end
