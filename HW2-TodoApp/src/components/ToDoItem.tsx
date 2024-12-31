import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface IToDoItem {
  task: { id: number; text: string; completed: boolean };
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}

function ToDoItem({ task, deleteTask, toggleCompletion }: IToDoItem) {
  return (
    <div className="flex items-center justify-between border-[#39D08B] border-2 rounded w-[500px] p-5 my-5">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task.id)}
        className="flex-none"
      />


      <p
        className={`flex-grow text-center px-5 ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </p>

      <FontAwesomeIcon
        className="text-red-600 cursor-pointer flex-none"
        icon={faTrash}
        onClick={() => deleteTask(task.id)}
      />
    </div>
  );
}

export default ToDoItem;
