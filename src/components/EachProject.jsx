import ArchiveIcon from "@mui/icons-material/Archive";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "../utils/project";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../utils/query";
export default function EachProject({ data, avatars }) {
	let navigate = useNavigate();
	const { title } = useParams();
	const isActive = data.title === title ? true : false;
	const {
		mutate: updateProj_mutate,
		data: updateProj_data,
		isSuccess: updateProj_success,
	} = useMutation({
		mutationFn: () => updateProject(data.id, data),
	});
	if (updateProj_success && !updateProj_data?.code) {
		queryClient.invalidateQueries(["projects"]);
	}
	return (
		<>
			<Button
				className="!rounded-xl !p-0 flex !justify-between !shadow-none !border-slate-300 !pr-3"
				style={
					isActive
						? { backgroundColor: "#365efe", fontFamily: "Poppins" }
						: { backgroundColor: "white", fontFamily: "Poppins" }
				}
				onClick={() => {
					navigate("/project/" + data.title);
				}}
				variant="outlined"
			>
				<div className="flex items-center gap-3 h-full w-full py-4 pl-4">
					{avatars[data.avatarId]}
					<h2
						className="lg:text-base text-sm normal-case font-medium text-left xl:w-36"
						style={isActive ? { color: "white" } : { color: "black" }}
					>
						{data.title}
					</h2>
				</div>
				<Tooltip title={!data.archive ? "Archive" : "UnArchive"} arrow>
					<div
						className="p-3 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer duration-300"
						onClick={(e) => {
							e.stopPropagation();
							data.archive = !data.archive;
							updateProj_mutate();
						}}
					>
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
