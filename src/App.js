import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
function App() {
	return (
		<>
			<Navbar />
			<Projects className={"lg:flex hidden"} />
		</>
	);
}

export default App;
