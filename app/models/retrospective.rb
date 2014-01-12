class Retrospective < ActiveRecord::Base
  validates :title, presence: true
end
