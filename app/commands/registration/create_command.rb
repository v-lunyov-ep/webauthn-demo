# frozen_string_literal: true

module Registration
  class CreateCommand < ApplicationCommand
    attr_accessor :params

    def initialize(params)
      @params = params

      super()
    end

    def call
      if user.valid?
        broadcast(:ok, { user_attributes: user.attributes, create_options: })
      else
        broadcast(:error, errors_hash(user))
      end
    end

    private

    def create_options
      @create_options ||= relying_party.options_for_registration(
        user: {
          name: username,
          id: user.webauthn_id
        },
        authenticator_selection: { user_verification: 'required' }
      )
    end

    def user
      @user ||= User.new(username:)
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
