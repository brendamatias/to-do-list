import toast from "react-hot-toast";

const STORAGE_KEY = "tasks";

export function saveToStorage(value: Task[]) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    toast.error("Erro ao salvar tarefa");
  }
}

export function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Task[]) : [];
  } catch {
    toast.error("Erro ao carregar tarefas");
    return [];
  }
}

export function removeFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    toast.error("Erro ao remover tarefa");
  }
}
