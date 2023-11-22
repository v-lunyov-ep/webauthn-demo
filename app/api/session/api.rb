# frozen_string_literal: true

module Session
  class API < Grape::API
    version :v1
    format :json
    prefix :session

    namespace :sign_in do
      desc 'Sign in'
      params do
        optional :username, type: String
      end
      post do
        Session::CreateCommand.call(params) do
          on(:ok) { |options| present options }
          on(:error) { |errors| error!(errors, 400) }
        end
      end

      desc 'Sign in callback'
      post :callback do
        Session::CallbackCommand.call(params) do
          on(:ok) { |options| present options }
          on(:error) { |errors| error!(errors, 400) }
        end
      end
    end

    namespace :sign_up do
      desc 'Sign up'
      params do
        optional :username, type: String
      end
      post do
        Registration::CreateCommand.call(params) do
          on(:ok) { |options| present options }
          on(:error) { |errors| error!(errors, 400) }
        end
      end

      desc 'Sign up callback'
      post :callback do
        Registration::CallbackCommand.call(params) do
          on(:ok) { |options| present options }
          on(:error) { |errors| error!(errors, 400) }
        end
      end
    end
  end
end
