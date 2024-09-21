const Pet = require("../models/Pet");
const User = require("../models/User");
const Walk = require("../models/Walk");
const Document = require("../models/Document");
const PetFood = require("../models/PetFood");

const PetController = {
  async create(req, res) {
    try {
      const petData = { ...req.body, ownerId: req.user._id };
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
      if (req.file) {
        updateData.petPic = req.file.path;
      }
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
      const pet = await Pet.findById(req.params.id)
        .populate({
          path: "ownerId",
          select: "name email pets"
        });
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
  async addMedication(req, res) {
    try {
      const pet = await Pet.findById(req.params.id);
      pet.medications.push(req.body);
      await pet.save();
      res.send({ message: "Medication added successfully", pet });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error adding medication.", error });
    }
  },
  async startWalk(req, res) {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).send({ message: "Pet not found" });
      }
      const newWalk = await Walk.create({
        petsId: pet._id,
        startDate: new Date(),
        speed: req.body.speed,
        rating: req.body.rating
      });
      pet.walkIds.push(newWalk._id);
      await pet.save();
      res.status(201).send({ message: "Walk started successfully", newWalk });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error adding walk.", error });
    }
  },
  async endWalk(req, res) {
    try {
      const pet = await Pet.findByIdAndUpdate(req.params.id)
      console.log(pet)
      const walk = await Walk.findById(req.body.walkIds);
      if (!walk) {
        return res.status(404).send({ message: "Walk not found" });
      }
      walk.endDate = new Date();
      walk.rating = req.body.rating;
      await walk.save();

      res.send({ message: "Walk ended successfully", walk });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error ending the walk.", error });
    }
  },
  async addDocument(req, res) {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).send({ message: "Pet not found" });
      }
      if (!req.file) {
        return res.status(400).send({ message: "No document uploaded" });
      }

      const newDocument = await Document.create({
        documentName: req.body.documentName,
        petId: pet._id,
        documentFile: req.file.path
      });
      pet.documentIds.push(newDocument._id);
      await pet.save();
      res.status(201).send({ message: "Document added successfully", newDocument });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error adding document.", error });
    }
  },
  async addFood(req, res) {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).send({ message: "Pet not found" });
      }
      const newPetFood = await PetFood.create({
        petId: pet._id,
        foodId: req.body.foodId,
        timesPerDay: req.body.timesPerDay,
        startDate: req.body.startDate || new Date(),
        endDate: req.body.endDate || null,
        hours: req.body.hours
      });
      pet.petFoodId.push(newPetFood._id);
      await pet.save();
      res.status(201).send({ message: "Food added successfully", newPetFood });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error adding food to pet", error });
    }
  },
};

module.exports = PetController;