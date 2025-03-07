const mongoose = require('mongoose');

const conventionSchema = new mongoose.Schema({
    wording: {type: String, required: true}, //Libellé de la convention
    membershipCost: {type: String, required: true}, //Coût d'adhésion à la convention
    insuredShare: {type: Number, required:true}, //Part de l'adhérent (en %)
});

// export default mongoose.model('Convention', conventionSchema);
module.exports = mongoose.model('Convention', conventionSchema);