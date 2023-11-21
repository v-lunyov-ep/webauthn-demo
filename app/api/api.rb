# frozen_string_literal: true

class API < Grape::API
  format :json
  mount Auth::API
  mount Session::API

  add_swagger_documentation info: { title: 'Webauthn app' }
end
