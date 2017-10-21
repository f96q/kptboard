class Retrospective < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  has_many :labels, ->{ order(position: :asc) }, dependent: :destroy
  has_many :retrospectives_users, dependent: :destroy
  has_many :users, through: :retrospectives_users

  scope :has_user, -> (user) { includes(:retrospectives_users).where(retrospectives_users: { user: user }) }
end
