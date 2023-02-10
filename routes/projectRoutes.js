const express = require("express");
const router = express.Router();

const Project = require("../models/project");
//add project
router.post("/", async (req, res) => {
  const {
    projectName,
    openCost,
    targetOpens,
    clickCost,
    targetClicks,
    status,
  } = req.body;

  try {
    let project = new Project({
      project_name: projectName,
      open_cost: openCost,
      target_opens: targetOpens,
      click_cost: clickCost,
      target_clicks: targetClicks,
      status: status,
    });

    let result = await project.save();
    res.status(200).send("Project added successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//fetch all projects
router.get("/", async (req, res) => {
  try {
    let projects = await Project.find({});
    res.status(200).json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//fetch single project
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    let project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//update project
router.put("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const {
    projectName,
    openCost,
    targetOpens,
    clickCost,
    targetClicks,
    status,
  } = req.body;

  try {
    let project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });
    let projectData = {};
    if (projectName) projectData.project_name = projectName;
    if (openCost) projectData.open_cost = openCost;
    if (targetOpens) projectData.target_opens = targetOpens;
    if (clickCost) projectData.click_cost = clickCost;
    if (targetClicks) projectData.target_clicks = targetClicks;
    if (status) projectData.status = status;
    await Project.findByIdAndUpdate(
      projectId,
      { $set: { ...projectData } },
      { new: true }
    );
    res.status(200).send("Project updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete single project
router.delete("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    let project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ msg: "Project not found" });
    await Project.findByIdAndRemove(req.params.projectId);
    res.status(200).send("Project deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
