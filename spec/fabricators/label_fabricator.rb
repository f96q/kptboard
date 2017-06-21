Fabricator(:label) do
  kind { Label.kinds.values.sample }
  description { Faker::Lorem.unique.sentence }
  created_at {
    time = Time.current
    Faker::Time.between(1.years.ago(time), time)
  }
end
