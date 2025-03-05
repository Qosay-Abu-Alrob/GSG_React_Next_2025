"use client";
import { ITask } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

const TaskDetails: FC<{ id: number }> = ({ id }) => {
  const router = useRouter();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        if (!res.ok) throw new Error("Task not found");
        const data: ITask = await res.json();
        const priorities: ITask["priority"][] = ["High", "Medium", "Low"];
        setTask({
          ...data,
          priority: priorities[data.id % priorities.length],
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [id, router]);

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (!task) return <p className="text-center text-red-500">Task not found</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        <p className="mt-3 text-gray-600">
          <span className="font-semibold">Status:</span> 
          <span className={task.completed ? "text-green-600" : "text-yellow-500"}>
            {task.completed ? " Completed" : " Pending"}
          </span>
        </p>
        <p className="mt-2 text-gray-600 font-semibold">
          Priority: 
          <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full 
            ${task.priority === "High" ? "bg-red-500 text-white" : 
              task.priority === "Medium" ? "bg-yellow-400 text-black" : 
              "bg-green-500 text-white"}`}>
            {task.priority}
          </span>
        </p>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
