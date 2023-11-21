# frozen_string_literal: true

module Session
  class CallbackCommand < ApplicationCommand
    attr_accessor :params

    def initialize(params)
      @params = params

      super()
    end

    def call
      broadcast(:error, 'no username') unless user

      begin
        verified_webauthn_credential, stored_credential = relying_party.verify_authentication(
          params[:credential],
          params.dig(:data, :get_options, :challenge),
          user_verification: true,
        ) do |webauthn_credential|
          user.credentials.find_by(external_id: Base64.strict_encode64(webauthn_credential.raw_id))
        end

        stored_credential.update!(sign_count: verified_webauthn_credential.sign_count)

        broadcast(:ok, user)
      rescue WebAuthn::Error => e
        broadcast(:error, "Verification failed: #{e.message}")
      end
    end

    private

    def user
      @user ||= User.find_by(username: params.dig(:data, :user_attributes, :username))
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
