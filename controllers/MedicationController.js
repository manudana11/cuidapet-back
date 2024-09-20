const Medication = require("../models/Medication");

const MedicationController = {
    async create(req, res) {
        try {
            const medicationData = {...req.body}
            if (req.file) {
                medicationData.medicationPic = req.file.path;
            }
            const medication = await Medication.create(medicationData);
            res.status(200).send({message: 'Medication created succesfully', medication})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There´s been a problem creating the medication', error })
        }
    },

}

module.exports = MedicationController;