class CreateReviewsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :ratings, null: false
      t.text :body, null: false
      t.string :author, null: false
      t.integer :item_id, null: false
      t.timestamps
    end
  end
end
