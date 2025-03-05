import Image from "next/image";
import Link from "next/link";
import { ITask } from "@/types/types";

function TaskItem({ task }: { task: ITask }) {
  return (
    <div className="container mx-auto px-4 py-4 w-full max-w-lg">
      <ul>
        <li
          key={task.id}
          className="flex items-center gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
        >
          <Image
            src={task.completed ? "/checkmark.png" : "/clock.png"}
            width={24}
            height={24}
            alt="Status Icon"
          />
          <Link
            href={`/TaskDetails/${task.id}`}
            className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors duration-300"
          >
            {task.title}
          </Link>
          <span
            className={`ml-auto px-2 py-1 text-sm font-semibold rounded ${
              task.priority === "High"
                ? "bg-red-100 text-red-600"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default TaskItem;
