import TaskListContainer from "./TaskListContainer";
export default function TaskContainer() {
	return (
		<>
			<div className="bg-[#f7f7f7] py-6 2xl:px-20 lg:px-14 sm:px-8 px-14 gap-y-10 flex items-center justify-between sm:overflow-x-scroll sm:flex-nowrap flex-wrap lg:gap-8 gap-4">
				<TaskListContainer title={"To Do"} />
				<TaskListContainer title={"In Progress"} />
				<TaskListContainer title={"Done"} />
			</div>
		</>
	);
}
