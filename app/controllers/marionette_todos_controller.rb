class MarionetteTodosController < TodosController

private
  def todo_params
    params.require(:marionette_todo).permit(:status, :item)
  end
end
