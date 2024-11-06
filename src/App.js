import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import TaskTitle from "./components/TaskTitle";
import TaskContainer from "./components/TaskContainer";
function App() {
	return (
		<>
			<div className="h-[100vh]">
				<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold lg:py-5 border-b-2 border-slate-200 w-full">
					Taska
				</h1>
				<div className="flex flex-row-reverse">
					<div className="2xl:w-[80%] xl:w-[75%] lg:w-[65%] w-full">
						<Navbar />
						<div className="flex flex-col">
							<TaskTitle />
							<TaskContainer />
						</div>
					</div>
					<Projects className={"lg:flex hidden"} />
				</div>
			</div>
		</>
	);
}

export default App;
