import React, {useMemo, useState} from "react";
import {layoutClasses, SORT_OPTIONS} from "../assets/dummy";
import {Clock, Filter, ListChecks, Plus, Space} from "lucide-react";
import {useOutletContext} from "react-router-dom";
import {TaskItem} from "../components/TaskItem";
import {TaskModel} from "../components/TaskModel";


export const PendingPage = () => {
    const {tasks = [], refreshTasks} = useOutletContext();
    const [showModel, setShowModel] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [selectedTask, setSeletedTask] = useState(null);

  

    // SORT THE TASK BASE ON THE OPTION AVAILABLE
    const sortedPendingTasks = useMemo(() => {
        const filtered = tasks.filter(
            (t) => !t.completed || (typeof t.completed === "string" && t.completed?.toLowerCase() === "no")
        );
        return filtered.sort((a, b) => {
            if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            const order = {high: 3, medium: 2, low: 1};
            return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()];
        });
    }, [tasks, sortBy]);

    return (
        <div className={layoutClasses.container}>
            <div className={layoutClasses.headerWrapper}>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <ListChecks className="text-purple-500"> </ListChecks>
                        Pending Tasks
                    </h1>
                    <p className="text-sm text-gray-500  mt-1 ml-7">
                        {sortedPendingTasks.length} task{sortedPendingTasks.length != 1 && "s"} needing your attention
                    </p>
                </div>

        {/* SORT CONTROL */}
                <div className={layoutClasses.sortBox}>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Filter className="w-4 h-4 text-purple-500"></Filter>
                        <span className="text-sm">Sort By:</span>
                    </div>

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={layoutClasses.select}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="priority">Priority</option>
                    </select>

                    <div className={layoutClasses.tabWrapper}>
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setSortBy(opt.id)}
                                className={` ${layoutClasses.tabButton(sortBy === opt.id)} cursor-pointer`}
                            >
                                {opt.icon}
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* ADD TASK DESKTOP VIEW */}
            <div
                onClick={() => setShowModel(true)}
                className="hidden md:flex items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 bg-purple-50/50 cursor-pointer transition-colors  mb-5"
            >
                <Plus className="w-5 h-5 text-purple-500 mr-2 "></Plus>
                <span className="text-gray-600 font-medium">Add New Task</span>
            </div>

            <div className="space-y-4">
                {sortedPendingTasks.length === 0 ? (
                    <div className={layoutClasses.emptyState}>
                        <div className="max-w-xs mx-auto py-6">
                            <div className={layoutClasses.emptyIconBg}>
                                <Clock className="w-8 h-8 text-purple-800"></Clock>
                            </div>
                            <h3 className="text-lg font-semibold to-gray-800 mb-2">All Caught up!</h3>
                            <p className="text-sm text-gray-500 mb-4">No Pending Tasks -greate work!</p>
                            <button onClick={() => setShowModel(true)} className={layoutClasses.emptyBtn}>
                                Create New Task
                            </button>
                        </div>
                    </div>
                ) : (
                    sortedPendingTasks.map((task) => (
                        <TaskItem
                            key={task._id || task.id}
                            tasks={task}
                            showCompleteCheckBox
                            onDelete={() => handleDelete(task.id || task._id)}
                            onRefresh={refreshTasks}
                            onToggleComplete={() => handleToggleComplete(task.id || task._id, t.completed)}
                            onEdit={() => {
                                setSeletedTask(task);
                                setShowModel(true);
                            }}
                        ></TaskItem>
                    ))
                )}
            </div>
            <TaskModel
                isOpen={!!selectedTask || showModel}
                onClose={() => {
                    setShowModel(false);
                    setSeletedTask(null);
                    refreshTasks();
                    taskToEdit={selectedTask}
                }}
            ></TaskModel>
        </div>
    );
};
