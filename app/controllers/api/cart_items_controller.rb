class Api::CartItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]
  before_action :set_items, only: [:destroy_multiple]

  def index
    @items = CartItem.all.index_by { |item| item.item_id.to_i }
    render json: @items
  end   
  
  def show
    render json: @item
  end

  def create
    @item = CartItem.new(cart_item_params)
  
    @item.id = @item.item_id
  
    if current_user.present?
      @item.user_id = current_user.id
    else
      demo_user = User.find_by(username: 'Demo')
      @item.user_id = demo_user.id if demo_user.present?
    end
  
    if @item.save
      render json: @item, status: :created
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @item.update(cart_item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @itemId = params[:item_id]
    cart_item = CartItem.find_by(id: @itemId)
    return if cart_item&.destroy
  
    @itemIds = params[:item_ids]
  
    @itemIds.each do |id|
      cart_item = CartItem.find_by(id: id)
      cart_item&.destroy
    end
  end  

  private

  def set_item
    @item = CartItem.find(params[:id])
  end

  def set_items
    @items = CartItem.where(id: params[:itemIds])
  end

  def cart_item_params
    params.require(:cart_item).permit(:name, :cost, :description, :user_id, :item_id, :quantity, :image_url)
  end   
end