import TaskListContainer from "./TaskListContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { updateTask } from "../utils/tasks";
import { useQuery } from "@tanstack/react-query";
export default function TaskContainer({ tasks, setTasks }) {
	let task, tl;
	const { refetch, isError, error } = useQuery({
		queryKey: ["updateTask"],
		queryFn: () => updateTask(task.id, { ...task, status: tl }),
		enabled: false,
	});
	const moveTask = (taskId, targetList) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				return task.index === taskId ? { ...task, status: targetList } : task;
			})
		);
		task = tasks.find((t) => {
			return t.index === taskId;
		});
		tl = targetList;
		if (task.status !== tl) refetch();
	};
	if (isError) console.log(error);
	return (
		<>
			<DndProvider
				backend={window.innerWidth < 770 ? TouchBackend : HTML5Backend}
			>
				<div className="bg-[#f7f7f7] pt-10 2xl:px-20 lg:px-8 sm:px-8 px-4 gap-y-10 flex items-start justify-between overflow-x-scroll lg:gap-8 gap-4">
					<TaskListContainer
						title={"To Do"}
						name="to do"
						tasks={tasks}
						moveTask={moveTask}
						setTasks={setTasks}
					/>
					<TaskListContainer
						title={"In Progress"}
						name="in progress"
						tasks={tasks}
						moveTask={moveTask}
						setTasks={setTasks}
					/>
					<TaskListContainer
						title={"Done"}
						name="done"
						tasks={tasks}
						moveTask={moveTask}
						setTasks={setTasks}
					/>
				</div>
			</DndProvider>
		</>
	);
}
