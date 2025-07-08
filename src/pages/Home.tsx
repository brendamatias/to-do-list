import { Button, Input } from "@/components";
import NoEyeIcon from "@/assets/no-eye.svg?react";
import CheckedIcon from "@/assets/check-filled.svg?react";
import UncheckedIcon from "@/assets/check-outline.svg?react";
import { cn } from "@/lib";

const tasks = [
  { id: 1, title: "Criar cards no backlog", done: true },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
  { id: 2, title: "Finalizar header", done: false },
];

export const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold">to-do list</h1>
        <p className="text-[#8C8E93] font-normal text-sm">
          vamos deixar de procastinar?
        </p>
        <hr className="my-5" />
        <div className="flex justify-between items-end gap-4 mb-[30px]">
          <span className="text-[#8C8E93] text-sm">3 Concluídos</span>
          <Button variant="secondary">
            <NoEyeIcon />
            Ocultar concluídos
          </Button>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto flex flex-col gap-5 pr-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3 p-2">
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
        <Input placeholder="Nova nota" />
      </div>
    </div>
  );
};
