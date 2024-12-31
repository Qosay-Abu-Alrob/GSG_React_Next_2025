import  { useState } from "react";

interface IForm {
  addTask: (text: string) => void;
}

function Form({ addTask }: IForm) {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div className="py-10 mt-5 border-[#39D08B] border-2 rounded w-[500px]">
      <div>
        <input
          className="px-5 py-1 border-2 border-[#39D08B] rounded focus:border-[#39D08B] focus:outline-none"
          type="text"
          placeholder="Type to do here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div>
        <button
          className="cursor-pointer px-24 py-1 mt-5 bg-[#39D08B] text-white rounded"
          onClick={handleAddTask}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default Form;
