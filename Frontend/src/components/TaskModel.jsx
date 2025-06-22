import React, {useCallback, useEffect, useState} from "react";
import {baseControlClasses, DEFAULT_TASK, priorityStyles} from "../assets/dummy";
import {AlignLeft, Calendar, CheckCircle, Flag, PlusCircle, Save, X} from "lucide-react";
import {data} from "react-router-dom";

const API_BASE = "https://task-management-2b5f.onrender.com/api/tasks";
export const TaskModel = ({isOpen, onClose, taskToEdit, onSave, onLogout, onRefresh}) => {
    const [taskData, setTaskData] = useState(DEFAULT_TASK);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    // UPDATING THE EXISTING TASK
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (taskToEdit) {
            const normalized = taskToEdit.completed == "Yes" || taskToEdit.completed === true ? "Yes" : "No";
            console.log("status", normalized);
            setTaskData({
                ...DEFAULT_TASK,
                title: taskToEdit.title || "",
                description: taskToEdit.description || "",
                priority: taskToEdit.priority || "Low",
                dueDate: taskToEdit.dueDate?.split("T")[0] || "",
                completed: normalized,
                id: taskToEdit._id,
            });
        } else {
            setTaskData(DEFAULT_TASK);
        }
        setError(null);
    }, [isOpen, taskToEdit]);

    // EXTRACT THE USER INPUT FROM THE TEXTBOX
    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;

        setTaskData((prev) => ({...prev, [name]: value}));
    }, []);

    const getHeaders = useCallback(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No Auth token Found");
        }

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }, []);

    const handleFormSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (taskData.dueDate < today) {
                setError("Due Date Cannot be int the past");
                return;
            }
            setLoading(true);
            setError(null);

            try {
                const isEdit = Boolean(taskData.id);
                console.log(isEdit);
                const url = isEdit ? `${API_BASE}/${taskData.id}/gp` : `${API_BASE}/gp`;
                const resp = await fetch(url, {
                    method: isEdit ? "PUT" : "POST",
                    headers: getHeaders(),
                    body: JSON.stringify({
                        ...taskData,
                        completed: taskData.completed === "Yes", // convert to boolean
                    }),
                });

                if (!resp.ok) {
                    if (resp.status === 404) {
                        return onLogout?.();
                    }
                    const err = await resp.json();

                    throw new Error(err.message || "Failed To Save Task");
                }

                const saved = await resp.json();

                onRefresh?.();
                onSave?.(saved);
                onClose();
            } catch (error) {
                console.error(error);
                setError(error.message || "An unexpected Error");
            } finally {
                setLoading(false);
            }
        },
        [taskData, today, getHeaders, onLogout, onSave, onClose]
    );

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center">
            <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-xl relative p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {taskData.id ? (
                            <Save className="text-purple-500 h-5 w-5"></Save>
                        ) : (
                            <PlusCircle className="text-purple-500 h-5 w-5"></PlusCircle>
                        )}
                        {taskData.id ? "Edit Task" : "Create New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 cursor-pointer hover:text-purple-500"
                    >
                        <X className="w-5 h-5"></X>
                    </button>
                </div>

                {/* FORM TO FILL CREATE NEW TASK */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {error && <div className="text-red-600 bg-red-50 rounded-lg border border-red-100 ">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                        <div className="flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200 ">
                            <input
                                type="text"
                                name="title"
                                required
                                value={taskData.title}
                                onChange={handleInputChange}
                                placeholder="Enter task title"
                                className="w-full focus:outline-none text-sm "
                            ></input>
                        </div>
                    </div>

                    {/* TEXTAREA */}
                    <div>
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                            <AlignLeft className="w-4 h-4 text-purple-500"></AlignLeft>Description
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            value={taskData.description}
                            onChange={handleInputChange}
                            placeholder="Add details About your task"
                            className={baseControlClasses}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                                <Flag className="w-4 h-4 text-purple-500" />
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={taskData.priority}
                                className={`${baseControlClasses} ${priorityStyles[taskData.priority]} cursor-pointer`}
                                onChange={handleInputChange}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                                <Calendar className="w-4 h-4 text-purple-500" />
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                required
                                min={today}
                                value={taskData.dueDate}
                                onChange={handleInputChange}
                                className={baseControlClasses}
                            ></input>
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                                <CheckCircle className="w-4 h-4 text-purple-500" />
                                Status
                            </label>

                            <div className="flex gap-4">
                                {[
                                    {val: "Yes", label: "Completed"},
                                    {val: "No", label: "In Progress"},
                                ].map(({val, label}) => (
                                    <label key={val} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="completed"
                                            value={val}
                                            checked={taskData.completed === val}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-purple-600 focus:ring-offset-purple-500 border-b-gray-300 rounded cursor-pointer"
                                        ></input>
                                        <span className="ml-2 text-sm text-gray-700 whitespace-nowrap">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r  from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                        {loading ? (
                            "saving..."
                        ) : taskData.id ? (
                            <>
                                <Save className="w-4 h-4 " />
                                Update Task
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-4 h-4 " />
                                Create Task
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
