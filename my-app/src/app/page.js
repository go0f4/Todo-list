"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const createTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { title: inputValue.trim(), isChecked: false }]);
    setInputValue("");
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].isChecked = !updated[index].isChecked;
    setTasks(updated);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isChecked));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isChecked;
    if (filter === "completed") return task.isChecked;
    return true;
  });

  const completedCount = tasks.filter((t) => t.isChecked).length;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-[#000] px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
        <h1 className="text-center text-[20px] font-semibold text-black">
          To-Do list
        </h1>

        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none placeholder:text-gray-400"
            type="text"
            placeholder="Add a new task..."
          />
          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-[14px]"
          >
            Add
          </button>
        </div>

        <div className="flex justify-start gap-2">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-md text-[12px] font-medium ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => toggleTask(index)}
                  className="w-5 h-5 text-blue-500 rounded-md border-gray-300"
                />
                <span
                  className={`text-base ${
                    task.isChecked ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => removeTask(index)}
                className="text-red-600 bg-red-100 hover:bg-red-200 px-4 py-1 rounded-md text-sm font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <hr className="border-gray-300" />

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            {completedCount} of {tasks.length} task
            {tasks.length !== 1 ? "s" : ""} completed
          </p>
          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear completed
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Powered by{" "}
          <Link
            className="text-blue-600 hover:underline"
            href="https://pinecone.mn"
          >
            Pinecone academy
          </Link>
        </p>
      </div>
    </div>
  );
}