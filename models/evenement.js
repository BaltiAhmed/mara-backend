const mongoose = require("mongoose");
const schema = mongoose.Schema;

const evenementSchema = new schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  Ddebut: { type: String, required: true },
  Dfin: { type: String, required: true },
  type: { type: String, required: true },
  photo: { type: String, required: true },
  finished:{type: Boolean, required: true },
  reservations: [
    { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  ],
});

module.exports = mongoose.model("evenement", evenementSchema);
