import TaskListContainer from "./TaskListContainer";
export default function TaskContainer() {
	let titles = [
		{
			title: "ali",
			description: "man ali hastam",
			src: "/",
			time: "1 Days",
			status: "todo",
			id: "0",
		},
		{
			title: "ahmad",
			description: "man ali hastam",
			src: "/",
			time: "3 Days",
			status: "inprogress",
			id: "1",
		},
		{
			title: "asghar",
			description: "man ali hastam",
			src: "/",
			time: "3 Days",
			status: "done",
			id: "2",
		},
		{
			title: "mohammad",
			description: "man ali hastam",
			src: "/",
			time: "2 Days",
			status: "todo",
			id: "3",
		},
	];
	return (
		<>
			<div className="bg-[#f7f7f7] pt-12 2xl:px-20 lg:px-14 sm:px-8 px-4 gap-y-10 flex items-start justify-between overflow-x-scroll lg:gap-8 gap-4">
				<TaskListContainer
					title={"To Do"}
					data={titles.filter((t) => t.status === "todo")}
				/>
				<TaskListContainer
					title={"In Progress"}
					data={titles.filter((t) => t.status === "inprogress")}
				/>
				<TaskListContainer
					title={"Done"}
					data={titles.filter((t) => t.status === "done")}
				/>
			</div>
		</>
	);
}