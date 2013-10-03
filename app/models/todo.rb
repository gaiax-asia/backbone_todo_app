class Todo < ActiveRecord::Base
  DONE = 1
  PENDING = 0
  validates :item, presence: true
end
