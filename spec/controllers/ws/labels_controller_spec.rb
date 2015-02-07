require 'rails_helper'

describe 'Ws::LabelsController' do
  include WsHelper

  let(:retrospective) { Fabricate :retrospective }
  let(:user) { Fabricate :user }

  describe 'labels.create' do
    let(:label_params) { {typ: 'keep', description: 'description'} }
    let(:event) { create_event('labels.create', {retrospective_id: retrospective.id, label: label_params}).dispatch }

    it_behaves_like 'authorize user'

    it 'should create label' do
      retrospective.add_user! user.id
      sign_in user
      expect { event }.to change { retrospective.labels.count }.by(1)
    end

    it 'should be routed correctly' do
      expect(create_event('labels.create', nil)).to be_routed_only_to 'ws/labels#create'
    end
  end

  describe 'labels.destroy' do
    let(:label) { Fabricate :label, retrospective: retrospective }
    let(:event) { create_event('labels.destroy', {retrospective_id: retrospective.id, id: label.id}).dispatch }

    it_behaves_like 'authorize user'

    it 'should destroy label' do
      retrospective.add_user! user.id
      sign_in user
      expect { event }.to change { retrospective.labels.count }.by(0)
    end

    it 'should be routed correctly' do
      expect(create_event('labels.destroy', nil)).to be_routed_only_to 'ws/labels#destroy'
    end
  end

  describe 'labels.update' do
    let(:event) { create_event('labels.update', {retrospective_id: retrospective.id}).dispatch }

    it_behaves_like 'authorize user'

    it 'should be routed correctly' do
      expect(create_event('labels.update', nil)).to be_routed_only_to 'ws/labels#update'
    end
  end

  describe 'labels.update_position' do
    let(:event) { create_event('labels.update_position', {retrospective_id: retrospective.id}).dispatch }

    it_behaves_like 'authorize user'

    it 'should be routed correctly' do
      expect(create_event('labels.update_position', nil)).to be_routed_only_to 'ws/labels#update_position'
    end
  end
end
