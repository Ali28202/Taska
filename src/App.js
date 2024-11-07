import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectTitle from "./components/ProjectTitle";
import TaskContainer from "./components/TaskContainer";
import { useState } from "react";
function App() {
	const [isLogged, setIsLogged] = useState(true);
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
					<Navbar isLogged={isLogged} />
					{isLogged ? (
						<>
							<div className="flex flex-col">
								<ProjectTitle />
								<TaskContainer />
							</div>
						</>
					) : (
						<div className="flex items-center justify-center h-full text-2xl 2xl:p-72 xl:p-60 lg:p-56 md:p-56 text-center leading-relaxed pt-64">
							There is no Project Here. You Should Login First!!!
						</div>
					)}
				</div>
				{isLogged && <Projects className={"lg:flex hidden"} />}
			</div>
		</>
	);
}

export default App;
