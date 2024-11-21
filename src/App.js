import { useState } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
import { useQuery } from "@tanstack/react-query";
import { pb } from "./utils/auth";
import { fetchProjects } from "./utils/http";
export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isProjectActive, setIsProjectActive] = useState([]);
	const [tasks, setTasks] = useState(null);
	const [projects, setProjects] = useState([]);
	// projects need re write (db changed)
	const { data, isFetched } = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});
	if (!isLogged && pb.authStore.model) {
		setIsLogged(true);
	}
	// if (isFetched && data) {
	// 	if (projects == []) {
	// 		setProjects(data);
	// 		let activeArr = new Array(projects?.length || 0);
	// 		activeArr.fill(0);
	// 		activeArr[0] = 1;
	// 		setIsProjectActive(activeArr);
	// 	}
	// }
	// useEffect(() => {
	// 	if (isProjectActive?.indexOf(1) !== -1)
	// 		setTasks(projects[isProjectActive.indexOf(1)]?.tasks);
	// }, [isProjectActive]);
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
						setProjects={setProjects}
						isProjectActive={isProjectActive}
						setIsProjectActive={setIsProjectActive}
					/>
					{isLogged ? (
						<>
							<div className="flex flex-col">
								{projects.length ? (
									<>
										<ProjectTitle
											projects={projects}
											idxActiveProject={isProjectActive.indexOf(1)}
											tasks={tasks}
										/>
										<TaskContainer tasks={tasks} setTasks={setTasks} />
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
						setProjects={setProjects}
						isProjectActive={isProjectActive}
						setIsProjectActive={setIsProjectActive}
					/>
				)}
			</div>
		</>
	);
}
