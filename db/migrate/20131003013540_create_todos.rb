class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :status, :default => 0
      t.string :item

      t.timestamps
    end
  end
end
