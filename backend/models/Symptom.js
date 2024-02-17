const mongoose = require('mongoose');
const mongoosastic = require('mongoose-elasticsearch-xp');

const symptomSchema = new mongoose.Schema({
  Symptom: {
    type: String,
    required: false,
  },
  Age: {
    type: String,
    required: false,
  },
  Sex: {
    type: String,
    required: false,
  },
  PrimarySpecialist: {
    type: String,
    required: false,
  },
  SecondarySpecialist: {
    type: String,
    required: false,
  },
  TertiarySpecialist: {
    type: String,
    required: false,
  },
  AnatomicalRegion: {
    type: String,
    required: false,
  },
});

symptomSchema.plugin(mongoosastic, {
  hosts: ['localhost:9200'], // Elasticsearch server
  populate: [
    { path: 'Symptom', select: 'Symptom' },
    { path: 'PrimarySpecialist', select: 'PrimarySpecialist' },
    { path: 'SecondarySpecialist', select: 'SecondarySpecialist' },
    { path: 'TertiarySpecialist', select: 'TertiarySpecialist' },
    { path: 'AnatomicalRegion', select: 'AnatomicalRegion' },
  ],
});

const SymptomModel = mongoose.model('Symptom', symptomSchema);

module.exports = SymptomModel;
