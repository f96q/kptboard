Fabricator(:retrospective) do
  title { Faker::Book.unique.title }
  created_at {
    time = Time.current
    Faker::Time.between(1.years.ago(time), time)
  }
end
