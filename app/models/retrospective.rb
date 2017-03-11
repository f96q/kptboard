class Retrospective < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  has_many :labels, ->{ order(position: :asc) }, dependent: :destroy
  has_many :retrospectives_users, dependent: :destroy
  has_many :users, through: :retrospectives_users

  def add_user!(user_id)
    retrospectives_users.create! user_id: user_id
  end

  def remove_user(user_id)
    retrospectives_users.where(user_id: user_id).first.try(:destroy)
  end

  def has_user?(user_id)
    self.class.has_user(user_id).present?
  end

  scope :has_user, -> (user_id) { includes(:retrospectives_users).where(retrospectives_users: { user_id: user_id }).references(:retrospectives_users) }
end
