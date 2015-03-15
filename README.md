# KPTBoard

[![Build Status](https://travis-ci.org/f96q/kptboard.svg?branch=master)](https://travis-ci.org/f96q/kptboard)
[![Code Climate](https://codeclimate.com/github/f96q/kptboard/badges/gpa.svg)](https://codeclimate.com/github/f96q/kptboard)


# Setup

## development

```
bundle install --without=heroku
bundle exec rake db:create db:migrate
bundle exec rails s
```