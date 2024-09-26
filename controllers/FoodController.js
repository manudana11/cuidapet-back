const Food = require("../models/Food");

const FoodController = {
    async create(req, res) {
        try {
            const foodData = {...req.body}
            if (req.file) {
                foodData.foodPic = req.file.path;
            }
            const food = await Food.create(foodData);
            res.status(200).send({message: 'Food created succesfully', food})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There´s been a problem creating the food', error })
        }
    },
    async getaAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const food = await Food.find()
                .limit(limit)
                .skip((page - 1) * limit);
            res.send({ message: 'Foods', food });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There´s been a problem getting the food', error })
        }
    }
}

module.exports = FoodController;