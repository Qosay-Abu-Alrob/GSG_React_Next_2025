import  { useState, useEffect } from "react";
import DateDisplay from "./components/Date";
import Form from "./components/Form";
import ToDoData from "./components/ToDoDate";
import ToDoItem from "./components/ToDoItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="pt-10 flex flex-col justify-center items-center text-center">
      <DateDisplay />
      <Form addTask={addTask} />
      <ToDoData tasks={tasks} />
      <div className="w-[500px] mt-5">
        {tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompletion={toggleTaskCompletion}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
