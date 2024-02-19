class Api::ReviewsController < ApplicationController
  def create

    item = Item.find(params[:item_id])
    review = Review.new(review_params)

    if review.save
      render json: review, status: :created
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @reviews = Review.find(params[:id])

    render :show
  end
  
  def index
    @reviews = Review.all 

    render :index
  end

  private
  def review_params
    params.require(:review).permit(:item_id, :ratings, :body, :author)
  end
end