# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
CREATE TABLE coffees (id SERIAL, name VARCHAR(50), type VARCHAR(50), description TEXT, ingredients TEXT, image TEXT, instructions TEXT);

INSERT INTO coffees (name, type, description, ingredients, image, instructions) VALUES ('Black Coffee', 'Drip', 'Bitter', 'ground coffee beans, water', 'null', 'brew, drink hot'); 
