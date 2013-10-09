class MarionetteTodosController < TodosController
  before_action :render_404


private
  def render_404
    render file: 'public/404.html', status: 404, layout: nil
  end

  def todo_params
    params.require(:marionette_todo).permit(:status, :item)
  end
end
