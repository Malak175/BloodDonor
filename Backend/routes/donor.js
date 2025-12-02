const express = require("express");
const router = express.Router();
const {  getAllDonors , addDonor ,  getDonorById ,updateDonorById ,deleteDonorById } = require("../controllers/donor");

// GET all donors
router.get("/", getAllDonors);

// POST new donor
router.post("/", addDonor);

// GET donor by ID
router.get("/find/:id", getDonorById);

// PUT update donor by ID
router.put("/find/:id", updateDonorById);

// DELETE donor by ID
router.delete("/find/:id", deleteDonorById);

module.exports = router;