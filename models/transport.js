const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transportSchema = new schema({
  type: { type: String, required: true },
  prix: { type: String, required: true },
  depart: { type: String, required: true },
  temps: { type: String, required: true },
});

module.exports = mongoose.model("transport", transportSchema);
