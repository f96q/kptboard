class RetrospectiveUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :retrospective
  validates :retrospective_id, uniqueness: {scope: :user_id}
end
