class Api::ItemsController < ApplicationController
    def show 

    end

    def 

    private
    def user_params
        params.require(:user).permit(:email, :username, :password)
    end
end