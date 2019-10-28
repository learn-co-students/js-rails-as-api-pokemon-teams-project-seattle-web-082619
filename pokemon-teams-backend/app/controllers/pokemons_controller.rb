require 'byebug'
class PokemonsController < ApplicationController

  def index
    render json: Pokemon.all
  end

  def create
    pokemon_array = Pokemon.where(trainer_id: params[:trainer_id])
    if pokemon_array.length < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      render json: Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    end
  end

  def destroy
    Pokemon.where(id: params[:id]).destroy_all
  end

end
