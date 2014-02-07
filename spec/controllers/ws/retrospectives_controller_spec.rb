require 'spec_helper'

describe 'Ws::RetrospectivesController' do
  include WsHelper

  let(:retrospective) { Fabricate :retrospective }
  let(:user) { Fabricate :user }

  describe 'retrospectives.open' do
    let(:event) { create_event('retrospectives.open', {retrospective_id: retrospective.id}).dispatch }

    it_behaves_like 'authorize user'

    context 'retrospective has user' do
      before do
        retrospective.add_user! user.id
        sign_in user
      end

      it 'should return labels' do
        expect(event).to trigger_success_message labels: retrospective.labels.map(&:as_json), users: [user.as_json]
      end
    end

    it 'should be routed correctly' do
      create_event('retrospectives.open', nil).should be_routed_only_to 'ws/retrospectives#open'
    end
  end

  describe 'retrospectives.add_user' do
    let(:other_user) { Fabricate :user }
    let(:event) { create_event('retrospectives.add_user', {retrospective_id: retrospective.id, email: other_user.email}).dispatch }

    it_behaves_like 'authorize user'

    context 'authorize success' do
      before do
        retrospective.add_user! user.id
        sign_in user
      end

      it 'should add user' do
        expect(event).to trigger_success_message other_user.as_json
      end

      context 'unregistered email' do
        let(:event) { create_event('retrospectives.add_user', {retrospective_id: retrospective.id, email: 'retrospectives-test@example.com'}).dispatch }

        it 'should not found user' do
          expect(event).to trigger_failure_message 'not found user'
        end
      end
    end

    it 'should be routed correctly' do
      create_event('retrospectives.add_user', nil).should be_routed_only_to 'ws/retrospectives#add_user'
    end
  end

  describe 'retrospectives.remove_user' do
    let(:other_user) { Fabricate :user }
    let(:event) { create_event('retrospectives.remove_user', {retrospective_id: retrospective.id, id: other_user.id}).dispatch }

    it_behaves_like 'authorize user'

    context 'authorize success' do
      before do
        retrospective.add_user! user.id
        sign_in user
      end

      it 'should remove user' do
        retrospective.add_user! other_user.id
        expect(event).to trigger_success_message({id: other_user.id})
      end

      context 'have not retrospective user' do
        it 'should have not user' do
          expect(event).to trigger_failure_message('have not user')
        end
      end
    end

    it 'should be routed correctly' do
      create_event('retrospectives.remove_user', nil).should be_routed_only_to 'ws/retrospectives#remove_user'
    end
  end
end
