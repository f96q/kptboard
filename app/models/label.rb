class Label < ActiveRecord::Base
  TYPE = {
    keep: 'keep',
    problem: 'problem',
    try: 'try'
  }

  validates :typ, inclusion: {in: TYPE.values}
  belongs_to :retrospective

  acts_as_list scope: 'labels.typ = \'#{typ}\''

  def as_json(options = nil)
    {
      id: id,
      typ: typ,
      position: position,
      description: description
    }
  end
end
