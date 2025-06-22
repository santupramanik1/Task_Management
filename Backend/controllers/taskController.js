import Task from "../models/taskModel.js";

// CREATE A NEW TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed == "yes" || completed == true,
      owner: req.user.id
    });

    const savedTask = await task.save();

    return res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      savedTask
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL TASK FOR THE LOGGED _IN USER

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1
    });
    return res.json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE TASK BY ID (MUST BELONG TO THAT PARTICULAR USER)
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    return res.json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPADATE THE TASK BY ID
export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed != undefined) {
      data.completed = data.completed == "yes" || data.completed == true;
    }

    const update = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id
      },
      data,
      { new: true, runValidators: true }
    );

    // if update is successfully done
    if (!update) {
      return res
        .status(404)
        .json({ success: false, message: "Task not Found or not your's" });
    }

    return res.json({
      success: true,
      message: "Task Updated successfully",
      update
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE A TASK
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Task not Found or not your's" });
    }

    return res.json({
      success: true,
      message: "Task deleted Successfully",
      deleted
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
