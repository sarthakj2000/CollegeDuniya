const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const Campaign = require("../models/campaign");
//add campaign
router.post("/:projectId", async (req, res) => {
  const { campaignName, opens, clicks, status } = req.body;
  try {
    let project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    let campaign = new Campaign({
      project_id: req.params.projectId,
      campaign_name: campaignName,
      opens: opens,
      clicks: clicks,
      status: status,
    });

    await campaign.save();
    res.status(200).send("Campaign added successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//fetch all campaigns
router.get("/", async (req, res) => {
  try {
    let projects = await Campaign.find({});
    res.status(200).json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//fetch single campaign
router.get("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  try {
    let campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//update campaign
router.put("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;
  const { projectId, campaignName, opens, clicks, status } = req.body;

  try {
    let campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    let campaignData = {};
    if (projectId) campaignData.project_id = projectId;
    if (campaignName) campaignData.campaign_name = campaignName;
    if (opens) campaignData.opens = opens;
    if (clicks) campaignData.clicks = clicks;
    if (status) campaignData.status = status;
    await Campaign.findByIdAndUpdate(
      campaignId,
      { $set: { ...campaignData } },
      { new: true }
    );
    res.status(200).send("Campaign updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete single campaign
router.delete("/:campaignId", async (req, res) => {
  const { campaignId } = req.params;

  try {
    let campaign = await Campaign.findById(campaignId);

    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    await Campaign.findByIdAndRemove(req.params.campaignId);
    res.status(200).send("Campaign deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//fetch campaign by projectID
router.get("/project/:projectId", async (req, res) => {
  try {
    let project = await Campaign.find({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.status(200).json(project)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
