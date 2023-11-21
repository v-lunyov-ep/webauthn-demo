# frozen_string_literal: true

module Auth
  class API < Grape::API
    version :v1
    format :json
    prefix :auth

    desc 'Sign up'
    params do
      optional :username, type: String
    end
    post :sign_up do
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
