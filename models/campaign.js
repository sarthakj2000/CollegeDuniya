const mongoose = require("mongoose");

const CampaignSchema = mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  campaign_name: {
    type: String,
  },
  open: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("campaign", CampaignSchema);
