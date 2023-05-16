const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const mongoosePaginate = require("mongoose-paginate-v2");

const { todoSetJson } = require("../helpers/modelHelper");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: todoSetJson,
  }
)
  .plugin(mongooseDelete)
  .plugin(mongoosePaginate);

const model = mongoose.model("todo", schema);

module.exports = model;
