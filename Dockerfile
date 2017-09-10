FROM ruby:2.4.1

ENV RAILS_ENV production
ENV SECRET_KEY_BASE secret_key_base
ENV NODE_ENV production
ENV NPM_CONFIG_PRODUCTION false

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs yarn
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --without development test
ADD . /app
RUN cp /app/config/database.yml.nulldb /app/config/database.yml
RUN yarn install
RUN yarn run build
RUN bundle exec rake assets:precompile
RUN rm /app/config/database.yml

CMD bundle exec puma -C config/puma.rb