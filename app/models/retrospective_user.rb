class RetrospectiveUser < ActiveRecord::Base
  validates :retrospective_id, uniqueness: {scope: :user_id}
end
