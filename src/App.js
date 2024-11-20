import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
import PocketBase from "pocketbase";
import { useQuery } from "@tanstack/react-query";
const pb = new PocketBase("https://taska.liara.run");
pb.autoCancellation(false);
export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isProjectActive, setIsProjectActive] = useState([]);
	const [authData, setAuthData] = useState(null);
	const [tasks, setTasks] = useState(null);
	const [projects, setProjects] = useState([]);
	const { data, isFetched } = useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			let userEmail = pb.authStore.model.email;
			const records = await pb.collection("projects").getFullList({
				filter: `User_email = '${userEmail}'`,
			});
			return records;
		},
	});
	// first time refresh
	if (pb.authStore.model && !isLogged && isFetched) {
		setAuthData(pb.authStore.model);
		setProjects(data);
		let activeArr = new Array(projects.length);
		activeArr.fill(0);
		activeArr[0] = 1;
		setIsProjectActive(activeArr);
		setTasks(projects[isProjectActive.indexOf(1)]?.tasks);
		setIsLogged(true);
	}
	useEffect(() => {
		setTasks(projects[isProjectActive.indexOf(1)]?.tasks);
	}, [isProjectActive]);
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
						pb={pb}
						authData={authData}
						setAuthData={setAuthData}
						isLogged={isLogged}
						setIsLogged={setIsLogged}
						projects={projects}
						setProjects={setProjects}
						isProjectActive={isProjectActive}
						setIsProjectActive={setIsProjectActive}
					/>
					{isLogged ? (
						<>
							<div className="flex flex-col">
								<ProjectTitle
									projects={projects}
									idxActiveProject={isProjectActive.indexOf(1)}
									tasks={tasks}
								/>
								<TaskContainer tasks={tasks} setTasks={setTasks} />
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
						pb={pb}
						className={"lg:flex hidden"}
						projects={projects}
						setProjects={setProjects}
						isProjectActive={isProjectActive}
						setIsProjectActive={setIsProjectActive}
					/>
				)}
			</div>
		</>
	);
}
