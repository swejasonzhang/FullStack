class Api::CartItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    @items = CartItem.all
    render json: @items
  end

  def show
    render json: @item
  end

  def create
    # debugger

    @item = CartItem.new(cart_item_params)
    # debugger
    @item.user_id = current_user.id
    # debugger
    if @item.save
      render json: @item, status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
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
    head :no_content
  end

  private
  def set_item
    @item = CartItem.find(params[:id])
  end

  def cart_item_params
    params.require(:cart_item).permit(:user_id, :item_id, :quantity)
  end
end