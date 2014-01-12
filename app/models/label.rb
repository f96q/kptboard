class Label < ActiveRecord::Base
  TYPE = {
    keep: 'keep',
    problem: 'problem',
    try: 'try'
  }

  validates :typ, inclusion: {in: TYPE.values}
  belongs_to :retrospective
end
