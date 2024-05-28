class Api::ItemsController < ApplicationController
    def index
        @items = Item.all
        render :index
    end

    def show
        @item = Item.find_by(id: params[:id])
        render :show
    end

    def update
        @item = Item.find(params[:id])
    
        if @item.update(item_params)
            render :show
        else
            render json: @item.errors.full_messages, status: :unprocessable_entity
        end
    end

    def item_params
        params.require(:item).permit(:stock)
    end
end