import { Button, Input } from "@/components";
import NoEyeIcon from "@/assets/no-eye.svg?react";
import CheckedIcon from "@/assets/check-filled.svg?react";
import UncheckedIcon from "@/assets/check-outline.svg?react";
import { cn } from "@/lib";
import { useState } from "react";
import { loadFromStorage, saveToStorage } from "@/utils";
import { X } from "lucide-react";

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>(loadFromStorage());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [newTask, setNewTask] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

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

  const deleteTask = (id: number) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveToStorage(updated);
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedText(task.title);
  };

  const saveEdit = () => {
    if (editingId === null) return;

    const updated = tasks.map((task) =>
      task.id === editingId ? { ...task, title: editedText } : task
    );

    setTasks(updated);
    saveToStorage(updated);
    setEditingId(null);
    setEditedText("");
  };

  const visibleTasks = hideCompleted
    ? tasks.filter((task) => !task.done)
    : tasks;

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold">to-do list</h1>
        <p className="text-[#8C8E93] font-normal text-sm">
          vamos deixar de procastinar?
        </p>

        <hr className="my-5" />

        <div className="flex sm:flex-row flex-col-reverse justify-between items-start sm:items-end gap-4 mb-[30px]">
          <span className="text-[#8C8E93] text-sm">
            {tasks.filter((t) => t.done).length}/{tasks?.length} Concluídos
          </span>
          <Button
            variant="secondary"
            onClick={() => setHideCompleted((prev) => !prev)}
          >
            <NoEyeIcon />
            Ocultar concluídos
          </Button>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto flex flex-col items-start gap-5 pr-2">
        {visibleTasks?.map((task) => (
          <li
            key={task.id}
            className="flex justify-between gap-4 items-center w-full"
          >
            <div className="flex items-center gap-3 p-2 flex-1">
              <span
                className="flex-shrink-0 w-6 h-6 cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? <CheckedIcon /> : <UncheckedIcon />}
              </span>

              {editingId === task.id ? (
                <input
                  className="bg-transparent border-b w-full border-white text-white focus:outline-none text-md"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                  }}
                  onBlur={saveEdit}
                  autoFocus
                />
              ) : (
                <span
                  className={cn(
                    "text-md text-[#F4F6FA] cursor-pointer",
                    task.done && "line-through text-[#8C8E93]"
                  )}
                  onClick={() => startEdit(task)}
                >
                  {task.title}
                </span>
              )}
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-[#8C8E93] hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
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
