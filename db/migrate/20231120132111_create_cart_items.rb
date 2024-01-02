class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.string :name, null: false
      t.float :cost, null: false
      t.text :description, null: false
      t.string :image_url, null: false
      t.bigint :user_id, null: false
      t.bigint :item_id, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
    add_index :cart_items, :user_id
    add_index :cart_items, :item_id
  end
end
