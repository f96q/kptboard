class Label < ActiveRecord::Base
  TYPE = {
    keep: 'keep',
    problem: 'problem',
    try: 'try'
  }

  validates :typ, inclusion: {in: TYPE.values}
  belongs_to :retrospective
  belongs_to :user, optional: true

  acts_as_list scope: [:retrospective_id, :typ]

  scope :label_typ, ->(typ) { where typ: typ }
end
