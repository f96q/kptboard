Fabricator(:retrospective) do
  title { Faker::Book.unique.title }
  created_at {
    time = Time.current
    Faker::Time.between(from: 1.years.ago(time), to: time)
  }
end
