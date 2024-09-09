const Pet = require("../models/Pet");
const User = require("../models/User");

const PetController = {
  async create(req, res) {
    try {
      const petData = { ...req.body, owner: req.user._id };
      if (req.file) {
        petData.petPic = req.file.path;
      }
      const newPet = await Pet.create(petData);
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { pets: newPet._id } },
        { new: true }
      );
      res.status(201).send({ message: `${req.user.name} created a pet successfully.`, newPet });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error during pet creation.", error });
    }
  },
  async update(req, res) {
    try {
      const updateData = req.body;
      const updatedPet = await Pet.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res.send({ message: "Pet successfully updated", updatedPet });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating pet.", error });
    }
  },
  async delete(req, res) {
    try {
      const pet = await Pet.findByIdAndDelete(req.params.id);
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { pets: pet._id } },
        { new: true }
      );
      res.send({ message: "Pet deleted", pet });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error deleting pet." });
    }
  },
  async getById(req, res) {
    try {
      const pet = await Pet.findById(req.params.id);
      res.send(pet);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving pet by ID." });
    }
  },
  async getPetByName(req, res) {
    try {
      const name = new RegExp(req.query.name, "i");
      const pets = await Pet.find({ name, owner: req.user._id });
      res.send(pets);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error searching pets by name." });
    }
  },
  async getInfoByOwner(req, res) {
    try {
      const pets = await Pet.find({ owner: req.user._id })
        .populate({
          path: "owner",
          select: "name email"
        });
      res.send(pets);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving pet information." });
    }
  },
};

module.exports = PetController;
