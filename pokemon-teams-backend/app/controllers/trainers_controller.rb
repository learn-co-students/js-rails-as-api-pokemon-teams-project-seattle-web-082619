class TrainersController < ApplicationController

  def index
    render json: Trainer.all
  end

  def show
    render json: @trainer, include: :pokemons
  end

end
