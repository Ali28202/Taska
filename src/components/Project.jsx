import Navbar from "./Navbar";
import ProjectTitle from "./ProjectTitle";
import ProjectsContainer from "./ProjectsContainer";
import TaskContainer from "./TaskContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { pb } from "../utils/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../utils/tasks";
import { fetchProjects } from "../utils/project";
import { useParams, useNavigate } from "react-router-dom";
export default function Project() {
	const navigator = useNavigate();
	const [tasks, setTasks] = useState([]);
	const isProjectActive =
		JSON.parse(localStorage.getItem("activeProject")) || [];
	const { title } = useParams();
	let projectBar = (
		<div className="lg:flex hidden items-center justify-center 2xl:w-[25%] xl:w-[25%] lg:w-[35%] w-full">
			<CircularProgress />
		</div>
	);
	useEffect(() => {
		if (pb.authStore.model) setTasks([]);
		else navigator("/signin");
	}, [title]);
	const {
		data: projects_data,
		isFetchedAfterMount: projects_fetchedAfterMount,
	} = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});
	const { data: tasks_data, isFetched: tasks_fetched } = useQuery({
		queryKey: ["tasks", title],
		queryFn: () => fetchTasks(title),
	});
	if (tasks_fetched && tasks_data?.length && !tasks?.length) {
		setTasks(tasks_data);
	}
	return (
		<>
			<div className="flex flex-row-reverse w-screen">
				<div className="2xl:w-[75%] xl:w-[75%] lg:w-[65%] w-full lg:border-l-2 border-slate-200">
					<Navbar projects={projects_data} isProjectActive={isProjectActive} />
					<div className="flex flex-col">
						{isProjectActive?.indexOf(1) !== -1 ? (
							<>
								<ProjectTitle
									projects={projects_data}
									idxActiveProject={isProjectActive?.indexOf(1)}
									tasks={tasks}
								/>
								<TaskContainer
									tasks={tasks}
									setTasks={setTasks}
									project_title={title}
								/>
							</>
						) : (
							<span className="flex items-center justify-center text-2xl text-center leading-relaxed text-gray-400 2xl:my-[24.5rem] xl:my-[20.4rem] lg:my-44 mt-48">
								No Project Selected
							</span>
						)}
					</div>
				</div>
				{!projects_fetchedAfterMount ? (
					projectBar
				) : (
					<ProjectsContainer
						className={"lg:flex hidden"}
						projects={projects_data}
						isProjectActive={isProjectActive}
					/>
				)}
			</div>
		</>
	);
}
