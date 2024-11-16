import ArchiveIcon from "@mui/icons-material/Archive";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
export default function EachProject({
	isActive,
	setIsActive,
	data,
	avatars,
	projects,
	setProjects,
}) {
	return (
		<>
			<Button
				className="!rounded-xl w-full lg:!pl-4 lg:!py-3 !py-2 flex !justify-between !shadow-none !border-slate-300"
				onClick={() =>
					setIsActive((isActive) => {
						let newArr = new Array(isActive.length);
						newArr.fill(0);
						newArr[+data.id] = 1;
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
					title={!data.archive ? "Archive" : "UnArchive"}
					arrow
					onClick={() => {
						setProjects(() => {
							if (!data.archive) {
								data.archive = true;
								let newProjects = projects.toSpliced(+data.id, 1, data);
								// setIsActive((perv) => {
								// 	let firstActiveId = projects.find((p) => {
								// 		return p.archive === false;
								// 	});
								// 	if (firstActiveId) firstActiveId = firstActiveId.id;
								// 	let newActiveArr = perv;
								// 	newActiveArr.fill(0);
								// 	if (newActiveArr[+firstActiveId] !== undefined)
								// 		newActiveArr[+firstActiveId] = 1;
								// 	console.log(newActiveArr);
								// 	return newActiveArr;
								// });
								return newProjects;
							} else {
								data.archive = false;
								let newProjects = projects.toSpliced(+data.id, 1, data);
								return newProjects;
							}
						});
					}}
				>
					<div className="p-3 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer duration-300">
						{data.archive ? (
							<UnarchiveIcon
								sx={isActive ? { color: "white" } : { color: "black" }}
								fontSize="small"
							/>
						) : (
							<ArchiveIcon
								sx={isActive ? { color: "white" } : { color: "black" }}
								fontSize="small"
							/>
						)}
					</div>
				</Tooltip>
			</Button>
		</>
	);
}
