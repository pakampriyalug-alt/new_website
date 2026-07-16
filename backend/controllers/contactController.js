const Contact = require("../models/Contact");

exports.addContact = async (req, res) => {
  try {
    console.log("BODY:", req.body);   

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ message: "Saved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteAllContacts = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
