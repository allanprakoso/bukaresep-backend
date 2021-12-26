require('dotenv').config();
const bcrypt = require('bcrypt');
const RecipesService = require("./src/services/postgres/RecipesService");

const mapToIngredientModel = (recipe_id, group_id, { name, unit, amount, description }) =>
({
    recipe_id,
    group_id,
    name,
    unit_id: unit,
    amount,
    description
})

const init = async () => {

    const hashedPassword = await bcrypt.hash('aksestokennyasiuynilho', 10);

    console.log(hashedPassword);
}


const payload = {
    "name": "SATE HELLO GORENG",
    "url_image": "http://ckckkcc.com",
    "group_ingredients": [
        {
            "id": 12,
            "group": "Bahan Pelengkap",
            "ingredients": [
                {
                    "id": 13,
                    "group_id": 12,
                    "name": "Buah Mangga",
                    "description": "Di Goreng pake minyak bukan air",
                    "amount": 2,
                    "unit_id": 1
                },
                {
                    "id": 14,
                    "group_id": 12,
                    "name": "Buah Markisa",
                    "description": "Di Goreng pake minyak dan air namanya apa?",
                    "amount": 2,
                    "unit_id": 1
                }
            ]
        },
        {
            "id": 13,
            "group": "Bahan Kulit",
            "ingredients": [
                {
                    "id": 15,
                    "group_id": 13,
                    "name": "Buah Mangga",
                    "description": "Di Goreng pake minyak bukan air",
                    "amount": 2,
                    "unit_id": 1
                },
                {
                    "id": 16,
                    "group_id": 13,
                    "name": "Buah Apel",
                    "description": "Di Goreng pake minyak bukan air",
                    "amount": 2,
                    "unit_id": 1
                }
            ]
        }
    ],
    "instructions": [
        {
            "id": 7,
            "recipe_id": 18,
            "step": "Langkah 1",
            "instruction": "Haluskan AIR dengan minyak",
            "url_image": "http://ckckkcc.com",
            "url_video": null
        },
        {
            "id": 8,
            "recipe_id": 18,
            "step": "Langkah 1",
            "instruction": "Haluskan AIR dengan minyak",
            "url_image": "http://ckckkcc.com",
            "url_video": null
        }
    ],
    "cooking_time": 40,
    "serving": 4,
    "category_id": 1,
    "cuisine_id": 1,
    "level_id": 1,
    "tags": [
        "masakan",
        "minuman",
        "enak"
    ]
}

init();