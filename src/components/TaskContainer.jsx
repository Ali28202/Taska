import TaskListContainer from "./TaskListContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
export default function TaskContainer({ tasks, setTasks }) {
	const moveTask = (taskId, targetList) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				return task.id === taskId ? { ...task, status: targetList } : task;
			})
		);
	};
	return (
		<>
			<DndProvider
				backend={window.innerWidth < 770 ? TouchBackend : HTML5Backend}
			>
				<div className="bg-[#f7f7f7] pt-12 2xl:px-20 lg:px-14 sm:px-8 px-4 gap-y-10 flex items-start justify-between overflow-x-scroll lg:gap-8 gap-4">
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
