# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.2.2'

gem 'rails', '~> 7.1.2'

gem 'bootsnap', require: false
gem 'cssbundling-rails'
gem 'jbuilder'
gem 'jsbundling-rails'
gem 'pg', '~> 1.1'
gem 'puma', '>= 5.0'
gem 'redis', '>= 4.0.1'
gem 'sprockets-rails'

gem 'grape'
gem 'grape-swagger'
gem 'rswag-api'
gem 'rswag-ui'

gem 'rectify'

gem 'webauthn'

group :development, :test do
  gem 'debug', platforms: %i[mri windows]
  gem 'dotenv-rails'

  gem 'rspec-rails'
  gem 'rswag-specs'
end

group :development do
  gem 'web-console'

  gem 'pry-rails'
  gem 'rubocop'
end
