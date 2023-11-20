class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.bigint :user_id
      t.bigint :item_id
      t.integer :quantity
      t.timestamps
    end
    add_index :cart_items, :user_id
    add_index :cart_items, :item_id
  end
end
