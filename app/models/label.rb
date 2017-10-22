class Label < ApplicationRecord
  enum kind: { keep: 'keep', problem: 'problem', try: 'try' }

  validates :kind, inclusion: { in: kinds.values }
  belongs_to :retrospective
  belongs_to :user, optional: true

  acts_as_list scope: [:retrospective_id, :kind]
end
