const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  project_name: {
    type: String,
  },
  open_cost: {
    type: Number,
    default: 5,
  },
  target_opens: {
    type: Number,
    default: 100,
  },
  click_cost: {
    type: Number,
    default: 10,
  },
  target_clicks: {
    type: Number,
    default: 50,
  },
  status: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
