import { ITask } from "@/types/types";
import TaskItem from "@/components/TaskItem";

async function getTasks() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!res.ok) throw new Error("Failed to fetch tasks");

  const tasks: ITask[] = await res.json();

  return tasks.map((task) => {
    const priorities: ITask["priority"][] = ["High", "Medium", "Low"];
    return {
      ...task,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
    };
  });
}

export default async function Home() {
  const tasks = await getTasks();
  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-4 text-center p-10">Task Tracker</h1>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
