json.array!(@todos) do |todo|
  json.extract! todo, :status, :item
  json.url todo_url(todo, format: :json)
end
