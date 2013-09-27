json.array!(@todos) do |todo|
  json.extract! todo, :status, :name, :description
  json.url todo_url(todo, format: :json)
end
