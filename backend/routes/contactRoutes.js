const express = require("express");
const router = express.Router();
const { addContact,getAllContacts,deleteAllContacts} = require("../controllers/contactController");

router.post("/addcontact", addContact);
router.get("/viewallcontacts",getAllContacts);
router.delete("/deletecontacts/:id",deleteAllContacts);


module.exports = router;
