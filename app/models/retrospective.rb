class Retrospective < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  has_many :labels, ->{ order(position: :asc) }, dependent: :destroy
  has_many :retrospective_users, dependent: :destroy
  has_many :users, through: :retrospective_users

  def add_user!(user_id)
    self.retrospective_users.create! user_id: user_id
  end

  def remove_user(user_id)
    self.retrospective_users.where(user_id: user_id).first.try(:destroy)
  end

  def has_user?(user_id)
    self.users.pluck(:id).include? user_id
  end

  scope :has_user, -> (user_id) { includes(:retrospective_users).where(RetrospectiveUser.arel_table[:user_id].eq(user_id)).references(:retrospective_users) }
end
