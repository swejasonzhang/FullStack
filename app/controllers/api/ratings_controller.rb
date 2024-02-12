class RatingsController < ApplicationController
    def create
      @rating = Rating.new(rating_params)
  
      if @rating.save
        render json: @rating, status: :created
      else
        render json: @rating.errors, status: :unprocessable_entity
      end
    end
  
    private
    def rating_params
      params.require(:rating).permit(:value, :item_id)
    end
  end
  