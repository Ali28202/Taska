import TaskListContainer from "./TaskListContainer";
export default function TaskContainer({ tasks, setTasks }) {
	return (
		<>
			<div className="bg-[#f7f7f7] pt-12 2xl:px-20 lg:px-14 sm:px-8 px-4 gap-y-10 flex items-start justify-between overflow-x-scroll lg:gap-8 gap-4">
				<TaskListContainer title={"To Do"} tasks={tasks} setTasks={setTasks} />
				<TaskListContainer
					title={"In Progress"}
					tasks={tasks}
					setTasks={setTasks}
				/>
				<TaskListContainer title={"Done"} tasks={tasks} setTasks={setTasks} />
			</div>
		</>
	);
}
