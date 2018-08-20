class RecipesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: Recipe.all
    end

    def show
        render json: Recipe.find(params["id"])
    end

    def create
        render json: Recipe.create(params["recipe"])
    end

    def delete
        render json: Recipe.delete(params["id"])
    end

    def update
        render json: Recipe.update(params["id"], params["recipe"])
    end

end
