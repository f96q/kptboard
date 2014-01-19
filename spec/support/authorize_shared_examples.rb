shared_examples_for 'authorize user' do
  include WsHelper

  context 'sign out user' do
    before { sign_in nil }

    it 'authorize failed' do
      expect(event).to trigger_failure_message 'sign out user'
    end
  end

  context 'retrospective has not user' do
    before { sign_in user }

    it 'authorize failed' do
      expect(event).to trigger_failure_message 'authorization failed'
    end
  end
end
