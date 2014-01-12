class Retrospective < ActiveRecord::Base
  validates :title, presence: true
  has_many :labels, dependent: :destroy
  has_many :retrospective_users, dependent: :destroy
  has_many :users, through: :retrospective_users
end
