class Api::ItemsController < ApplicationController
    def index
        @items = Item.all
        render :index
    end

    def show
        @item = Item.find_by(id: params[:id])
        render :show
    end
end