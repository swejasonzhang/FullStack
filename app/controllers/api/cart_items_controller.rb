class Api::CartItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]
  before_action :set_items, only: [:destroy_multiple]

  def index
    @items = CartItem.all
    render json: @items
  end

  def show
    render json: @item
  end

  def create
    @item = CartItem.new(cart_item_params)
  
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
    @item.destroy
  end

  def destroy_multiple
    @items.destroy_all
    head :no_content
  end

  private

  def set_item
    @item = CartItem.find(params[:id])
  end

  def set_items
    @items = CartItem.where(id: params[:itemIds])
  end

  def cart_item_params
    params.require(:cart_item).permit(:id, :name, :cost, :description, :user_id, :item_id, :quantity, :image_url)
  end   
end