class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :name
      t.integer :role_id
      t.integer :mapping_id

      t.timestamps
    end
  end
end
