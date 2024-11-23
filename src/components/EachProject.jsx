import ArchiveIcon from "@mui/icons-material/Archive";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useQuery } from "@tanstack/react-query";
import { updateProject } from "../utils/project";
export default function EachProject({ isActive, setIsActive, data, avatars }) {
	const {
		refetch: updateProj_refetch,
		isError: updateProj_isError,
		error: updateProj_error,
	} = useQuery({
		queryKey: ["updateProject"],
		queryFn: () => updateProject(data.id, data),
		enabled: false,
	});
	if (updateProj_isError) console.log(updateProj_error);
	return (
		<>
			<Button
				className="!rounded-xl w-full !p-0 flex !justify-between !shadow-none !border-slate-300 !pr-3"
				style={
					isActive
						? { backgroundColor: "#365efe", fontFamily: "Poppins" }
						: { backgroundColor: "white", fontFamily: "Poppins" }
				}
				onClick={() => {
					if (!isActive) {
						setIsActive((perv) => {
							let newArr = new Array(perv.length);
							newArr.fill(0);
							newArr[data.index] = 1;
							return newArr;
						});
					}
				}}
				variant="outlined"
			>
				<div className="flex items-center gap-3 h-full w-full p-4">
					{avatars[data.avatarId]}
					<h2
						className="lg:text-base text-sm normal-case font-medium text-left xl:w-36"
						style={isActive ? { color: "white" } : { color: "black" }}
					>
						{data.title}
					</h2>
				</div>
				<Tooltip
					title={!data.archive ? "Archive" : "UnArchive"}
					arrow
					onClick={(e) => {
						e.stopPropagation();
						if (!data.archive) {
							data.archive = true;
							updateProj_refetch();
						} else {
							data.archive = false;
							updateProj_refetch();
						}
						window.location.reload();
					}}
				>
					<div className="p-3 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer duration-300">
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
