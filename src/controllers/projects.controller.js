const Project = require("../models/projects.model");
const sanitize = require("mongo-sanitize");

exports.getAllProjects = async (req, res) => {
  try {
    res.json(await Project.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Not found..." });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProject = async (req, res) => {
  const {
    name,
    shortDescription,
    description,
    technologies,
    linkGitHub,
    linkHeroku,
  } = sanitize(req.body);
  const isDataValid =
    name && shortDescription && description && technologies && linkGitHub;
  try {
    if (isDataValid) {
      const newProject = new Project({
        name: name,
        shortDescription: shortDescription,
        description: description,
        technologies: technologies,
        linkGitHub: linkGitHub,
        linkHeroku: linkHeroku,
      });
      await newProject.save();
      res.json(newProject);
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const {
    name,
    shortDescription,
    description,
    technologies,
    linkGitHub,
    linkHeroku,
  } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(400).json({ message: "Bad request" });
    }
    await Project.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: name,
          shortDescription: shortDescription,
          description: description,
          technologies: technologies,
          linkGitHub: linkGitHub,
          linkHeroku: linkHeroku,
        },
      }
    );
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Not found..." });
    }
    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
