# frozen_string_literal: true

module Session
  class API < Grape::API
    version :v1
    format :json
    prefix :session

    desc 'Sign in'
    params do
      optional :username, type: String
    end
    post :sign_in do
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
end
