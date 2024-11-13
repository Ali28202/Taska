import { useState } from "react";
import EachProject from "./EachProject";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProject from "./AddProject";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import SquareIcon from "@mui/icons-material/Square";
import { FaRegBuilding } from "react-icons/fa";
export default function Projects({
	className,
	projects,
	setProjects,
	isProjectActive,
	setIsProjectActive,
}) {
	const [openDialog, setOpenDialog] = useState(false);
	let avatars = [
		// building
		<IconButton sx={{ padding: 0 }}>
			<div className="bg-[#c5d8e7] p-3 rounded-xl w-fit">
				<FaRegBuilding className="text-xl text-black" />
			</div>
		</IconButton>,
		// language
		<IconButton sx={{ padding: 0 }}>
			<div className="bg-[#e3f9fe] px-2.5 py-0.5 rounded-xl w-fit h-fit">
				<LanguageIcon className="!text-2xl text-[#73c6d8] mb-0.5" />
			</div>
		</IconButton>,
		// mobile
		<IconButton sx={{ padding: 0 }}>
			<div className="bg-[#d8ebff] px-2.5 py-0.5 md:rounded-xl rounded-xl w-fit">
				<SendToMobileIcon className="xl:text-xl lg:text-2xl text-lg text-black mb-1" />
			</div>
		</IconButton>,
		//square
		<IconButton sx={{ padding: 0 }}>
			<div className="bg-[#faeaff] px-2.5 py-0.5 md:rounded-xl rounded-xl w-fit">
				<SquareIcon className="xl:text-xl lg:text-2xl text-lg text-[#bd39ff] mb-1" />
			</div>
		</IconButton>,
	];
	return (
		<>
			<div
				className={`${className} lg:border-r-2 border-slate-200 2xl:w-[20%] xl:w-[25%] lg:w-[35%] w-full flex-col px-10 lg:pt-6 pt-3 lg:h-screen h-full justify-between`}
			>
				<div>
					<h1 className="text-2xl font-medium">Projects</h1>
					<div className="mt-6 flex flex-col gap-3 overflow-scroll 2xl:h-[26rem] xl:h-[25rem] lg:h-[24rem] sm:h-80 h-72">
						{projects?.map((t, idx) => {
							return (
								<EachProject
									isActive={isProjectActive[idx]}
									setIsActive={setIsProjectActive}
									index={idx}
									data={t}
									avatars={avatars}
								/>
							);
						})}
					</div>
				</div>
				<Button
					variant="outlined"
					style={{ fontFamily: "Poppins", borderStyle: "dashed" }}
					className="w-full !normal-case lg:!mb-5 flex gap-1 lg:!mt-0 md:!mt-16 !mt-24"
					onClick={() => setOpenDialog(true)}
				>
					<AddIcon fontSize="small" />
					Add Project
				</Button>
				<AddProject
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
					projects={projects}
					setProjects={setProjects}
				/>
			</div>
		</>
	);
}
