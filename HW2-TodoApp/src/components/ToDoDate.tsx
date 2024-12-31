

interface IToDoData {
  tasks: { id: number; text: string; completed: boolean }[];
}

function ToDoData({ tasks }: IToDoData) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex items-center justify-center py-5 mt-5 border-[#39D08B] border-2 rounded w-[500px]">
      <div className="mr-5">
        <p>{totalTasks}</p>
        <p>Created Tasks</p>
      </div>
      <div className="ml-5">
        <p>{completedTasks}</p>
        <p>Completed Tasks</p>
      </div>
    </div>
  );
}

export default ToDoData;
