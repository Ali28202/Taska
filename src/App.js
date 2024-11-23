import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
import { useQuery } from "@tanstack/react-query";
import { pb } from "./utils/auth";
import { fetchProjects } from "./utils/project";
import { fetchTasks } from "./utils/tasks";

export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const isProjectActive = JSON.parse(localStorage.getItem("activeProject"));
	const [projects, setProjects] = useState([]);
	const { data: projects_data, isFetched: projects_fetched } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});
	const {
		data: tasks_data,
		isError: tasks_isError,
		error: tasks_error,
	} = useQuery({
		queryKey: ["tasks"],
		queryFn: () => fetchTasks(projects[isProjectActive?.indexOf(1)]?.title),
	});
	if (!isLogged && pb.authStore.model) {
		setIsLogged(true);
	}
	if (projects_fetched && projects_data) {
		if (!projects.length && projects_data.length) {
			setProjects(projects_data);
		}
	}
	if (tasks_isError) console.log(tasks_error);
	return (
		<>
			{!isLogged && (
				<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold lg:py-5 border-b-2 border-slate-200 w-full">
					Taska
				</h1>
			)}
			<div className="flex flex-row-reverse">
				<div
					className={
						isLogged ? "2xl:w-[80%] xl:w-[75%] lg:w-[65%] w-full" : "w-full"
					}
				>
					<Navbar
						isLogged={isLogged}
						setIsLogged={setIsLogged}
						projects={projects}
						isProjectActive={isProjectActive}
					/>
					{isLogged ? (
						<>
							<div className="flex flex-col">
								{isProjectActive?.indexOf(1) !== -1 ? (
									<>
										<ProjectTitle
											projects={projects}
											idxActiveProject={isProjectActive?.indexOf(1)}
											tasks={tasks_data || []}
										/>
										<TaskContainer allTask={tasks_data || []} />
									</>
								) : (
									<span className="flex items-center justify-center text-2xl text-center leading-relaxed text-gray-400 2xl:my-[24.6rem] xl:my-[20.4rem] ">
										No Project Selected
									</span>
								)}
							</div>
						</>
					) : (
						<span className="flex items-center justify-center text-2xl pt-72 text-center leading-relaxed px-20 text-gray-400">
							There is no Project Here. You Should Login First!!!
						</span>
					)}
				</div>
				{isLogged && (
					<Projects
						className={"lg:flex hidden"}
						projects={projects}
						isProjectActive={isProjectActive}
					/>
				)}
			</div>
		</>
	);
}
