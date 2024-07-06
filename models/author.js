const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  familyName: { type: String, required: true, max: 100 },
  birthDate: { type: Date },
  deathDate: { type: Date },
});

AuthorSchema.virtual('name').get(() => {
  return this.familyName + ', ' + this.firstName;
});

AuthorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
