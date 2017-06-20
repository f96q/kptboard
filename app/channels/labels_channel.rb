class LabelsChannel < ApplicationChannel
  def create(data)
    return unless authenticate_retrospective?
    @label = Label.new(data['label'].to_h.tap {|params| params.merge!(user_id: current_user.id, retrospective_id: @retrospective.id) })
    Label.transaction do
      @label.save!
      @label.insert_at 1
      label = ApplicationController.render(partial: 'channels/label', locals: { label: @label })
      broadcast_to(type: 'CREATE_LABEL', label: JSON.parse(label))
    end
  end

  def destroy(data)
    return unless authenticate_retrospective?
    set_label(data)
    @label.destroy
    broadcast_to(type: 'DESTROY_LABEL', id: @label.id)
  end

  def update(data)
    return unless authenticate_retrospective?
    set_label(data)
    @label.update(data['label'])
    broadcast_to(type: 'UPDATE_LABEL',id: @label.id, label: data['label'])
  end

  def position(data)
    return unless authenticate_retrospective?
    set_label(data)
    Label.transaction do
      if @label.kind != data['kind']
        @label.remove_from_list
        @label.update!(kind: data['kind'])
      end
      @label.insert_at(data['position'].to_i)
    end
    broadcast_to(type: 'DROP_LABEL', id: @label.id, kind: @label.kind, index: @label.position - 1)
  end

  private

  def set_label(data)
    @label = @retrospective.labels.find_by(id: data['id'])
  end

  def broadcast_class
    LabelsChannel
  end
end
