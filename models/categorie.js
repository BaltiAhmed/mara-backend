const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categoreiSchema = new schema({
  nom: { type: String, required: true },
});

module.exports = mongoose.model("categorie", categoreiSchema);
