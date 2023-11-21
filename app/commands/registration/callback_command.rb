# frozen_string_literal: true

module Registration
  class CallbackCommand < ApplicationCommand
    attr_accessor :params

    def initialize(params)
      @params = params

      super()
    end

    def call
      begin
        webauthn_credential = relying_party.verify_registration(
          params[:credential],
          params.dig(:data, :create_options, :challenge),
          user_verification: true
        )

        credential = user.credentials.build(
          external_id: Base64.strict_encode64(webauthn_credential.raw_id),
          nickname: params.dig(:data, :user_attributes, :username),
          public_key: webauthn_credential.public_key,
          sign_count: webauthn_credential.sign_count
        )

        if credential.save
          broadcast(:ok, user)
        else
          broadcast(:error, errors_hash(user))
        end
      rescue WebAuthn::Error => e
        broadcast(:error, "Verification failed: #{e.message}")
      end
    end

    private

    def user
      @user ||= User.create!(params.dig(:data, :user_attributes))
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
