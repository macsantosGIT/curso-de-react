import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState([
    JSON.parse(localStorage.getItem("tasks")) || [],
  ]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // arrow function
    const fetchTasks = async () => {
      //chamar api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      //selecionar dados de retorno
      //setTasks(data); //atualizar o estado com os dados recebidos
      //armazenar dados no estado
    };
    //TODO: se quiser depois podemos chamar uma API para buscar as tarefas
    fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //atualizar esta tarefa
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //nao atualizar
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Task
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
