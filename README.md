![KPTBoard Logo](./kptboard.png)

[![Build Status](https://travis-ci.org/f96q/kptboard.svg?branch=master)](https://travis-ci.org/f96q/kptboard)
[![Code Climate](https://codeclimate.com/github/f96q/kptboard/badges/gpa.svg)](https://codeclimate.com/github/f96q/kptboard)


# Setup

## development

```
bundle install --without=heroku
bin/rails db:create db:migrate
yarn install
bundle exec foreman start -f Procfile.development
```

## test

```
bundle exec rake spec
yarn run test
```

## Docker

```
cp .env.db.example
cp .env.app.example
docker-compose up
docker-compose run app rake db:migrate
```