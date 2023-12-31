# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  mount API => '/api'

  root to: "application#index"
  get '*path', to: 'application#index'
end
