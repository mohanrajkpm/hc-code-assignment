class Role < ApplicationRecord
  #question added relation
  has_many :questions
end
