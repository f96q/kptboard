require 'rails_helper'

describe RetrospectivesController do
  describe 'export' do
    render_views

    let(:user) { Fabricate :user, name: 'test' }
    let!(:retrospective) { Fabricate :retrospective, title: 'retrospective' }
    let!(:keep_label) { Fabricate :label, kind: 'keep', retrospective: retrospective, user: user, description: 'description1', created_at: '2014-04-26' }
    let!(:problem_label) { Fabricate :label, kind: 'problem', retrospective: retrospective, user: user, description: 'description2', created_at: '2014-04-26' }
    let!(:try_label) { Fabricate :label, kind: 'try', retrospective: retrospective, user: user, description: 'description3', created_at: '2014-04-26' }
    let!(:retrospectives_user) { Fabricate :retrospectives_user, retrospective: retrospective, user: user }

    before do
      sign_in user
    end

    context 'text' do
      it 'should generate text' do
        get :export, params: { id: retrospective.id, format: 'text' }
        expect(response.body).to eq File.read(Rails.root.join('spec/support/files/export.txt'))
      end
    end
  end
end
