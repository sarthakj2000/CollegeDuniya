const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");
const path = require("path");
router.get("/", async (req, res) => {
  try {
    let { campaign_id } = req.query;
    if (!campaign_id) {
      return res.status(404).send("404 not found");
    }
    let campaign = await Campaign.find({ _id: campaign_id });
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    console.log("campaigncampaign", campaign);
    await Campaign.findByIdAndUpdate(
      { _id: campaign[0]._id },
      { open: campaign[0].open + 1 }
    );
    res.sendFile(path.join(__dirname + "/index.html"));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    let { campaign_id } = req.query;
    if (!campaign_id) {
      return res.status(404).send("404 not found");
    }
    let campaign = await Campaign.find({ _id: campaign_id });
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    await Campaign.findByIdAndUpdate(
      { _id: campaign[0]._id },
      { clicks: campaign[0].clicks + 1 }
    );
    res.status(200).send("clicks incremented");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
