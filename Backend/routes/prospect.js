const express = require("express");
const router = express.Router();
const { getAllProspects, addProspect, deleteProspect, getProspect } = require("../controllers/prospect");

// GET all prospects
router.get("/", getAllProspects);

// POST new prospect
router.post("/", addProspect);

// DELETE a prospect
router.delete("/:id", deleteProspect);

// GET a single prospect by ID
router.get("/:id", getProspect);

module.exports = router;
