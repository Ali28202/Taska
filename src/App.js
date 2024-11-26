import Navbar from "./components/Navbar";
export default function App() {
	return (
		<>
			<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold lg:py-5 border-b-2 border-slate-200 w-full">
				Taska
			</h1>
			<div className="flex flex-row-reverse">
				<div className="w-full">
					<Navbar />
					<span className="flex items-center justify-center text-2xl pt-72 text-center leading-relaxed px-20 text-gray-400">
						There is no Project Here. You Should Login First!!!
					</span>
				</div>
			</div>
		</>
	);
}
