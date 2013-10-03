# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

todo_items = [
  "Eat Breakfeast",
  "Feed Pugsly the cow",
  "Sit Down",
  "Eat lunch",
  "Call mom",
  "Tweet about feeding my cow, pugsly",
  "Join a hangout in google+",
  "Prepare Dinner",
  "Eat Dinner",
  "Get ready for bed",
  "Go to bed"
]
todo_items.each do |item|
  Todo.create(item: item)
end





