import { Button, Input } from "@/components";
import NoEyeIcon from "@/assets/no-eye.svg?react";
import CheckedIcon from "@/assets/check-filled.svg?react";
import UncheckedIcon from "@/assets/check-outline.svg?react";
import { cn } from "@/lib";
import { useState } from "react";
import { loadFromStorage, saveToStorage } from "@/utils";

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>(loadFromStorage());

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    const title = newTask.trim();
    if (!title) return;

    const newTaskItem: Task = {
      id: Date.now(),
      title,
      done: false,
    };

    const updated = [...tasks, newTaskItem];
    setTasks(updated);
    saveToStorage(updated);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
    saveToStorage(updated);
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold">to-do list</h1>
        <p className="text-[#8C8E93] font-normal text-sm">
          vamos deixar de procastinar?
        </p>
        <hr className="my-5" />
        <div className="flex justify-between items-end gap-4 mb-[30px]">
          <span className="text-[#8C8E93] text-sm">
            {tasks.filter((t) => t.done).length} Concluídos
          </span>
          <Button variant="secondary">
            <NoEyeIcon />
            Ocultar concluídos
          </Button>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto flex flex-col items-start gap-5 pr-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="inline-flex items-center gap-3 p-2 cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            {task.done ? <CheckedIcon /> : <UncheckedIcon />}

            <span
              className={cn(
                "text-md text-[#F4F6FA]",
                task.done && "line-through text-[#8C8E93]"
              )}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-[30px]">
        <Input
          placeholder="Nova nota"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
      </div>
    </div>
  );
};
