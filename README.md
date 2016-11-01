# KPTBoard

[![Build Status](https://travis-ci.org/f96q/kptboard.svg?branch=master)](https://travis-ci.org/f96q/kptboard)
[![Code Climate](https://codeclimate.com/github/f96q/kptboard/badges/gpa.svg)](https://codeclimate.com/github/f96q/kptboard)


# Setup

## development

```
cp Procfile.development Procfile
bundle install --without=heroku
bin/rails db:create db:migrate
npm install
bundle exec foreman start
```
