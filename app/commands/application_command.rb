# frozen_string_literal: true

class ApplicationCommand < Rectify::Command
  def errors_hash(object)
    { error: object.errors.as_json, full_messages: object.errors.full_messages.uniq }
  end
end
