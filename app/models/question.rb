class Question < ApplicationRecord
	belongs_to :role
	belongs_to :mapping

	delegate :name, to: :role, prefix: :role
  delegate :name, to: :mapping, prefix: :mapping
 
  paginates_per 10
end
