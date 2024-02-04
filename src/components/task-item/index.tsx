import { CheckCircle2, Clock, MoreHorizontal, Trash2 } from "lucide-react";
import { formatDate } from "../../helpers/format-date.helper";
import { Task } from "../../types/auth.types";
import { IconSpace } from "../ui/icon-space";
import "./TaskItem.scss";

interface TaskItem {
  task: Task;
  deleteButtonAction?: () => void;
  completeButtonAction?: () => void;
}

const TaskItem = ({
  task,
  deleteButtonAction,
  completeButtonAction,
}: TaskItem) => {
  const GetStatus = () => {
    if (task.iscomplete) {
      return (
        <span className="flex items-center gap-2 w-max px-4 py-1 bg-green-300 text-green-500 bg-opacity-10 rounded text-xs">
          <CheckCircle2 size={12} />
          Выполнено
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 w-max px-4 py-1 bg-orange-300 text-orange-500 bg-opacity-10 rounded text-xs">
        <Clock size={12} />В процессе
      </span>
    );
  };
  return (
    <div className="task-item">
      <div className="task-header">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">{task.title}</h1>
          <GetStatus />
        </div>
        <IconSpace onClick={completeButtonAction}>
          <CheckCircle2 size={16} />
        </IconSpace>
      </div>
      <div className="task-body">
        <p className="opacity-60">{task.description}</p>
      </div>
      <div className="task-footer">
        <span className="text-xs opacity-60">
          Создан {formatDate(task.created_at)}
        </span>
        <IconSpace onClick={deleteButtonAction}>
          <Trash2 size={16} />
        </IconSpace>
      </div>
    </div>
  );
};

export default TaskItem;
