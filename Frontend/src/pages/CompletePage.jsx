import React, {useMemo, useState} from "react";
import {CT_CLASSES, layoutClasses, SORT_OPTIONS} from "../assets/dummy";
import {CheckCircle, Filter} from "lucide-react";
import {useOutletContext} from "react-router-dom";
import { TaskItem } from "../components/TaskItem";

export const CompletePage = () => {
    const {tasks, refreshTasks} = useOutletContext();
    const [sortBy, setSortBy] = useState("newest");

    // FIND THE COMPLETED TASK
    const sortedcompleteTasks = useMemo(() => {
        return tasks
        .filter((tasks) =>
            [true, 1, "yes"].includes(
                typeof tasks.completed === "string" ? tasks.completed?.toLowerCase() : tasks.completed
            )
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "priority":
                    const order = {high: 3, medium: 2, low: 1};
                    return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()];
                default:
                    return 0;
            }
        });
    }, [tasks, sortBy]);

    return (
        <div className={CT_CLASSES.page}>
            {/* HEADER */}
            <div className={CT_CLASSES.header}>
                <div className={CT_CLASSES.titleWrapper}>
                    <h1 className={CT_CLASSES.title}>
                        <CheckCircle className="w-5 h-5 text-purple-500 md:w-6 md:h-6"></CheckCircle>
                        <span className="truncate">Complete Task</span>
                    </h1>
                    <p className={CT_CLASSES.subtitle}>
                        {sortedcompleteTasks.length} task {sortedcompleteTasks.length != 1 && "s"}marked as complete
                    </p>
                </div>

                {/* SORT CONTROL */}
                <div className={CT_CLASSES.sortContainer}>
                    <div className={CT_CLASSES.sortBox}>
                        <div className={CT_CLASSES.filterLabel}>
                            <Filter className="w-4 h-4 text-purple-500"></Filter>
                            <span className="text-xs md:text-sm">Sort By</span>
                        </div>
                        {/* MOBILE DROPDOWN */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={CT_CLASSES.select}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="priority">Priority</option>
                        </select>

                        {/* DESKTOP MENU BUTTON */}
                        <div className={CT_CLASSES.btnGroup}>
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
            </div>

            {/* TASK LIST */}
            <div className={CT_CLASSES.list}>
                {sortedcompleteTasks.length === 0 ? (
                    <div className={CT_CLASSES.emptyState}>
                        <div className={CT_CLASSES.emptyIconWrapper}>
                            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-500"></CheckCircle>
                        </div>
                        <h3 className={CT_CLASSES.emptyTitle}>No Completed Task yet!</h3>
                        <p className={CT_CLASSES.emptyText}>Complete Some task they'll Appear here</p>
                    </div>
                ) : (
                    sortedcompleteTasks.map((task) => (
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

                            className="opacity-90 hover:opacity-100 transition-opacity text-sm md:text-base"
                        ></TaskItem>
                    ))
                )}
            </div>
        </div>
    );
};
