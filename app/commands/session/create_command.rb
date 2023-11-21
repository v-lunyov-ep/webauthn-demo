# frozen_string_literal: true

module Session
  class CreateCommand < ApplicationCommand
    attr_accessor :params

    def initialize(params)
      @params = params

      super()
    end

    def call
      if user
        broadcast(:ok, { user_attributes: user.attributes, get_options: get_options })
      else
        broadcast(:error, "Username doesn't exist")
      end
    end

    private

    def get_options
      @get_options ||= relying_party.options_for_authentication(
        allow: user.credentials.pluck(:external_id),
        user_verification: 'required'
      )
    end

    def user
      @user ||= User.find_by(username: username)
    end

    def username
      params[:username]
    end

    def relying_party
      @relying_party ||=
        WebAuthn::RelyingParty.new(
          origin: ENV.fetch('WEBAUTHN_ORIGIN'),
          name: 'WebAuthn Rails Demo App'
        )
    end
  end
end
