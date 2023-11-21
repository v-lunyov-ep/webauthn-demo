# frozen_string_literal: true

class Credential < ApplicationRecord
  validates :external_id, :public_key, :nickname, :sign_count, presence: true
  validates :external_id, uniqueness: true
  validates :sign_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
