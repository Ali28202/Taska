import { useState } from "react";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
export default function App() {
	const [isLogged, setIsLogged] = useState(true);
	const [isProjectActive, setIsProjectActive] = useState([1, 0, 0, 0, 0]);
	const [projects, setProjects] = useState([
		{ title: "Piper Enterprice", avatarId: "0" },
		{ title: "Web Platform", avatarId: "1" },
		{ title: "Mobile Loop", avatarId: "2" },
		{ title: "Wiro Mobile App", avatarId: "3" },
	]);
	return (
		<>
			<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold lg:py-5 border-b-2 border-slate-200 w-full">
				Taska
			</h1>
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
								/>
								<TaskContainer />
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
