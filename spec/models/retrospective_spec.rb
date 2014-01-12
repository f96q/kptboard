require 'spec_helper'

describe Retrospective do
  let(:retrospective) { Fabricate :retrospective }
  let(:user1) { Fabricate :user }
  let(:user2) { Fabricate :user, email: 'test2@example.com' }

  it 'correct has user' do
    retrospective.add_user! user1.id
    expect(retrospective.has_user?(user1.id)).to be_true
    expect(retrospective.has_user?(user2.id)).to be_false
  end

  it 'success add user' do
    retrospective.add_user! user1.id
    expect(retrospective.has_user?(user1.id)).to be_true
  end

  it 'success remove user' do
    retrospective.add_user! user1.id
    retrospective.remove_user user1.id
    expect(retrospective.has_user?(user1.id)).to be_false
  end
end
