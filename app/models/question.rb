class Question < ApplicationRecord
  # Add relationship
  belongs_to :role
  belongs_to :mapping
  # Add delegation
  delegate :name, to: :role, prefix: :role
  delegate :name, to: :mapping, prefix: :mapping
  # Per page pagination
  paginates_per 10
end