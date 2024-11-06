import { FaRegBuilding } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
export default function EachProject({ isActive, setIsActive, index }) {
	return (
		<>
			<Button
				className="!rounded-xl w-full lg:!pl-4 lg:!py-3 !py-2 pr-1 flex items-center !justify-between !shadow-none !border-slate-300"
				// logic should be re written
				onClick={() =>
					setIsActive((isActive) => {
						if (isActive[index]) isActive = isActive.toSpliced(index, 1, 0);
						else isActive = isActive.toSpliced(index, 1, 1);
						return isActive;
					})
				}
				style={
					isActive
						? { backgroundColor: "#365efe", fontFamily: "Poppins" }
						: { backgroundColor: "white", fontFamily: "Poppins" }
				}
				variant="outlined"
			>
				<div className="flex items-center gap-3 mr-3">
					<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
						<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
					</div>
					<h2
						className="lg:text-base text-sm normal-case font-medium"
						style={isActive ? { color: "white" } : { color: "black" }}
					>
						Piper Enterprise
					</h2>
				</div>
				<IconButton variant="text" className="!p-0">
					<MoreVertIcon
						sx={isActive ? { color: "white" } : { color: "black" }}
						fontSize="40"
					/>
				</IconButton>
			</Button>
		</>
	);
}
