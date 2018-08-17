class DrinksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Drink.all
    end

    def show
        render json: Drink.find(params["id"])
    end

    def create
        render json: Drink.create(params["drink"])
    end

    def delete
        render json: Drink.delete(params["id"])
    end

    def update
        render json: Drink.update(params["id"], params["drink"])
    end

end
