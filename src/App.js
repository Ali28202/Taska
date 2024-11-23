import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
import { useQuery } from "@tanstack/react-query";
import { pb } from "./utils/auth";
import { fetchProjects } from "./utils/project";
import { fetchTasks } from "./utils/tasks";
import CircularProgress from "@mui/material/CircularProgress";

export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isProjectActive, setIsProjectActive] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	const { data: projects_data, isFetched: projects_fetched } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});
	const {
		data: tasks_data,
		isError: tasks_isError,
		error: tasks_error,
		refetch: tasks_refetch,
		isLoading: tasks_pending,
	} = useQuery({
		queryKey: ["tasks"],
		queryFn: () => fetchTasks(projects[isProjectActive.indexOf(1)]?.title),
		enabled: false,
	});
	let spinner = false;
	if (!isLogged && pb.authStore.model) {
		setIsLogged(true);
	}
	if (projects_fetched && projects_data) {
		if (!projects.length && projects_data.length) {
			setProjects(projects_data);
			let activeArr = new Array(projects?.length || 0);
			activeArr.fill(0);
			activeArr[0] = 1;
			setIsProjectActive(activeArr);
		}
	}
	useEffect(() => {
		tasks_refetch();
	}, [isProjectActive]);
	if (tasks_isError) console.log(tasks_error);
	if (tasks_pending) spinner = true;
	else spinner = false;
	return (
		<>
			{!isLogged && (
				<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold lg:py-5 border-b-2 border-slate-200 w-full">
					Taska
				</h1>
			)}
			<div className="flex flex-row-reverse h-screen">
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
						setIsProjectActive={setIsProjectActive}
					/>
					{isLogged ? (
						<>
							<div className="flex flex-col">
								{isProjectActive?.indexOf(1) !== -1 ? (
									<>
										<ProjectTitle
											projects={projects}
											idxActiveProject={isProjectActive.indexOf(1)}
											tasks={tasks_data}
										/>
										{spinner ? (
											<CircularProgress
												size={"50px"}
												className="mx-auto mt-36"
											/>
										) : (
											<TaskContainer tasks={tasks_data} setTasks={setTasks} />
										)}
									</>
								) : (
									<span className="flex items-center justify-center text-2xl text-center leading-relaxed py-80 px-20 text-gray-400">
										No Project Selected
									</span>
								)}
							</div>
						</>
					) : (
						<span className="flex items-center justify-center h-full text-2xl 2xl:p-72 xl:p-60 lg:p-56 md:p-56 text-center leading-relaxed pt-64 px-20 text-gray-400">
							There is no Project Here. You Should Login First!!!
						</span>
					)}
				</div>
				{isLogged && (
					<Projects
						className={"lg:flex hidden"}
						projects={projects}
						isProjectActive={isProjectActive}
						setIsProjectActive={setIsProjectActive}
					/>
				)}
			</div>
		</>
	);
}
