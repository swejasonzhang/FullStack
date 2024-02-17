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

  private

  def review_params
    params.require(:review).permit(:item_id, :ratings, :body, :author)
  end
end