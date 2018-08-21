class Recipe

    attr_reader :id, :name, :type, :description, :ingredients, :image, :instructions

    # DB = PG.connect(host: "localhost", port: 5432, dbname: 'recipes_api_development')

    if(ENV['DATABASE_URL'])
        uri = URI.parse(ENV['DATABASE_URL'])
        DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
        DB = PG.connect(host: "localhost", port: 5432, dbname: 'coffees_api_development')
    end

    def self.all
        result = DB.exec("SELECT * FROM recipes;")
            return result.map do |result|
                {
                    "id" => result["id"].to_i,
                    "name" => result["name"],
                    "type" => result["type"],
                    "description" => result["description"],
                    "image" => result["image"],
                    "instructions" => result["instructions"],
                    "ingredients" => result["ingredients"]
                }
            end
        end


    def self.find(id)
        results = DB.exec("SELECT * FROM recipes WHERE id=#{id};")
        return {
            "id" => results.first["id"].to_i,
            "name" => results.first["name"],
            "type" => results.first["type"],
            "description" => results.first["description"],
            "ingredients" => results.first["ingredients"],
            "image" => results.first["image"],
            "instructions" => results.first["instructions"]
        }
    end

    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO recipes (name, type, description, ingredients, image, instructions)
                VALUES ( '#{opts["name"]}', '#{opts["type"]}', '#{opts["description"]}', '#{opts["ingredients"]}', '#{opts["image"]}', '#{opts["instructions"]}' )
                RETURNING id, name, type, description, ingredients, image, instructions;
            SQL
        )
        return {
            "id" => results.first["id"].to_i,
            "name" => results.first["name"],
            "type" => results.first["type"],
            "description" => results.first["description"],
            "ingredients" => results.first["ingredients"],
            "image" => results.first["image"],
            "instructions" => results.first["instructions"]

        }
    end

    def self.delete(id)
        results = DB.exec("DELETE FROM recipes WHERE id=#{id};")
        return { "deleted" => true }
    end

    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE recipes
                SET name='#{opts["name"]}', type='#{opts["type"]}', description='#{opts["description"]}', ingredients='#{opts["ingredients"]}', image='#{opts["image"]}', instructions='#{opts["instructions"]}'
                WHERE id=#{id}
                RETURNING id, name, type, description, ingredients, image, instructions;
            SQL
        )
        return {
            "id" => results.first["id"].to_i,
            "name" => results.first["name"],
            "type" => results.first["type"],
            "description" => results.first["description"],
            "ingredients" => results.first["ingredients"],
            "image" => results.first["image"],
            "instructions" => results.first["instructions"]
        }
    end

end
