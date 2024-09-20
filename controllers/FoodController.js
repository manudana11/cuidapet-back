const Food = require("../models/Food");

const FoodController = {
    async create(req, res) {
        try {
            const foodData = {...req.body}
            if (req.file) {
                foodData.medicationPic = req.file.path;
            }
            const food = await Food.create(foodData);
            res.status(200).send({message: 'Food created succesfully', food})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There´s been a problem creating the food', error })
        }
    },

}

module.exports = FoodController;