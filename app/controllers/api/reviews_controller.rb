class Api::ReviewsController < ApplicationController
  def create
    item = Item.find(params[:item_id])
    review = Review.new(review_params)

    debugger

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

  def edit
    review = Review.find(params[:id])

    if review.update(review_params)
      render json: review, status: :ok
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review.destroy
      render json: { message: 'Review deleted successfully' }, status: :ok
    else
      render json: { error: "Failed to delete review" }, status: :unprocessable_entity
    end
  end

  def review_params
    params.require(:review).permit(:item_id, :ratings, :body, :author, :review_id)
  end
end
