import React, {useEffect, useState} from "react";
import {getPriorityBadgeColor, getPriorityColor, MENU_OPTIONS, TI_CLASSES} from "../assets/dummy";
import {Calendar, CheckCircle, Clock, MoreVertical} from "lucide-react";
import axios from "axios";
import {format, isToday} from "date-fns";
import {TaskModel} from "./TaskModel";
const API_BASE = "https://task-management-2b5f.onrender.com/api/tasks";

export const TaskItem = ({tasks, onRefresh, showCompleteCheckBox = true, onEdit, onLogout}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isCompleted, setIsCompleted] = useState(
        [true, 1, "yes"].includes(typeof tasks.completed == "string" ? tasks.completed.toLowerCase() : tasks.completed)
    );

    const [showEditModel, setShowEditModel] = useState(false);
    const [subTask, setSubTask] = useState(tasks.subTask || []);

    useEffect(() => {
        setIsCompleted(
            [true, 1, "yes"].includes(
                typeof tasks.completed == "string" ? tasks.completed.toLowerCase() : tasks.completed
            )
        );
    }, [tasks.completed]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No Auth token Found");
        }
        return {
            Authorization: `Bearer ${token}`,
        };
    };

    const borderColor = isCompleted ? "border-green-500" : getPriorityColor(tasks.priority).split(" ")[0];

    const handleComplete = async () => {
        const newStatus = isCompleted ? "No" : "Yes";

        try {
            await axios.put(`${API_BASE}/${tasks.id}/gp`, {completed: newStatus}, {headers: getAuthHeaders});
            setIsCompleted(!isCompleted);
            onRefresh?.();
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                onLogout?.();
            }
        }
    };

    //
    const handleSave = async (updatedTask) => {
        try {
            const payLoad = (({title, description, priority, dueDate, completed}) => ({
                title,
                description,
                priority,
                dueDate,
                completed,
            }))(updatedTask);
            await axios.put(`${API_BASE}/${tasks._id}/gp`, payLoad, {headers: getAuthHeaders()});
            setShowEditModel(false);
            onRefresh?.();
        } catch (error) {
            if (error.response?.status === 401) {
                onLogout?.();
            }
        }
    };

    const progress = subTask.length ? (subTask.filter((st) => st.completed).length / subTask.length) * 100 : 0;

    // HANDLE ACTION
    const handleAction = (action) => {
        setShowMenu(false);
        if (action === "edit") {
            setShowEditModel(true);
        }
        if (action === "delete") {
            handleDelete();
        }
    };

    // DELETE THE TASK
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE}/${tasks._id}/gp`, {headers: getAuthHeaders()});
            onRefresh?.();
        } catch (error) {
            if (error.response?.status === 401) {
                onLogout?.();
            }
        }
    };

    return (
        <>
            <div className={`${TI_CLASSES.wrapper} ${borderColor}`}>
                <div className={TI_CLASSES.leftContainer}>
                    {showCompleteCheckBox && (
                        <button
                            onClick={handleComplete}
                            className={`${TI_CLASSES.completeBtn} ${isCompleted ? "text-green-500" : "text-gray-300"}`}
                        >
                            <CheckCircle
                                size={18}
                                className={`${TI_CLASSES.checkboxIconBase} ${isCompleted ? "fill-green-500" : ""} `}
                            />
                        </button>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                            <h3
                                className={`${TI_CLASSES.titleBase} ${
                                    isCompleted ? "text-gray-400 line-through" : "text-gray-800"
                                }`}
                            >
                                {tasks.title}
                            </h3>
                            <span className={`${TI_CLASSES.priorityBadge} ${getPriorityBadgeColor(tasks.priority)}`}>
                                {tasks.priority}
                            </span>
                        </div>

                        {tasks.description && <p className={TI_CLASSES.description}>{tasks.description}</p>}
                    </div>
                </div>
                <div className={TI_CLASSES.rightContainer}>
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className={`${TI_CLASSES.menuButton} cursor-pointer`}
                        >
                            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 " size={18}></MoreVertical>
                        </button>

                        {showMenu && (
                            <div className={TI_CLASSES.menuDropdown}>
                                {MENU_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.action}
                                        onClick={() => handleAction(opt.action)}
                                        className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm hover:bg-purple-50  flex items-center cursor-pointer gap-2 transition-colors duration-200"
                                    >
                                        {opt.icon}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <div
                            className={` ${TI_CLASSES.dateRow} ${
                                tasks.dueDate && isToday(new Date(tasks.dueDate)) ? "text-fuchsia-600" : "text-gray-500"
                            }`}
                        >
                            <Calendar className="w-4 h-4 "></Calendar>
                            {tasks.dueDate
                                ? isToday(new Date(tasks.dueDate))
                                    ? "Today"
                                    : format(new Date(tasks.dueDate), "MMM dd")
                                : "-"}
                        </div>
                        <div className={TI_CLASSES.createdRow}>
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-1"></Clock>
                            {tasks.createdAt ? `Created ${format(new Date(tasks.createdAt), "MMM dd")}` : "No Date"}
                        </div>
                    </div>
                </div>
            </div>

            <TaskModel isOpen={showEditModel} onClose={() => setShowEditModel(false)} taskToEdit={tasks} onSave={handleSave}></TaskModel>
        </>
    );
};
