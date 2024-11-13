import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
export default function EachProject({
	isActive,
	setIsActive,
	index,
	data,
	avatars,
}) {
	return (
		<>
			<Button
				className={`!rounded-xl w-full lg:!pl-4 lg:!py-3 !py-2 flex !justify-between !shadow-none !border-slate-300 ${
					data.archive && "!hidden"
				}`}
				onClick={() =>
					setIsActive((isActive) => {
						let newArr = new Array(isActive.length);
						newArr.fill(0);
						newArr[index] = 1;
						return newArr;
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
					{avatars[data.avatarId]}
					<h2
						className="lg:text-base text-sm normal-case font-medium"
						style={isActive ? { color: "white" } : { color: "black" }}
					>
						{data.title}
					</h2>
				</div>
				<Tooltip
					title="Archive"
					arrow
					onClick={() => {
						data.archive = true;
					}}
				>
					<IconButton variant="text">
						<ArchiveIcon
							sx={isActive ? { color: "white" } : { color: "black" }}
							fontSize="small"
						/>
					</IconButton>
				</Tooltip>
			</Button>
		</>
	);
}
