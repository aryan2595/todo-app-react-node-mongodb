const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");

const {
  userSetJson,
  encryptPassword,
} = require("../helpers/modelHelper");

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, set: encryptPassword },
  },
  {
    timestamps: true,
    versionKey: false,
    virtuals: {
      token: { type: String },
    },
    toJSON: userSetJson,
  }
)
  .plugin(mongooseDelete)
  .plugin(mongoosePaginate);

const model = mongoose.model("user", schema);

module.exports = model;
