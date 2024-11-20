import { useState } from "react";
import EachProject from "./EachProject";
import AddProject from "./AddProject";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import SquareIcon from "@mui/icons-material/Square";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CloseIcon from "@mui/icons-material/Close";

export default function Projects({
	pb,
	className,
	projects,
	setProjects,
	isProjectActive,
	setIsProjectActive,
}) {
	const [openDialog, setOpenDialog] = useState(false);
	const [openArchive, setOpenArchive] = useState(false);
	let avatars = [
		// building
		<div className="bg-[#c5d8e7] p-2.5 rounded-xl w-fit h-fit flex items-center justify-center">
			<ApartmentIcon className="!text-2xl text-black" />
		</div>,
		// language
		<div className="bg-[#e3f9fe] p-2.5 rounded-xl w-fit h-fit flex items-center justify-center">
			<LanguageIcon className="!text-2xl text-[#73c6d8]" />
		</div>,
		// mobile
		<div className="bg-[#d8ebff] p-2.5 md:rounded-xl rounded-xl w-fit flex items-center justify-center">
			<SendToMobileIcon className="xl:text-xl lg:text-2xl text-lg text-black" />
		</div>,
		//square
		<div className="bg-[#faeaff] p-2.5 md:rounded-xl rounded-xl w-fit flex items-center justify-center">
			<SquareIcon className="xl:text-xl lg:text-2xl text-lg text-[#bd39ff]" />
		</div>,
	];
	return (
		<>
			<div
				className={`${className} lg:border-r-2 border-slate-200 2xl:w-[20%] xl:w-[25%] lg:w-[35%] w-full flex-col px-10 lg:pt-6 pt-3 justify-between`}
			>
				<div>
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-medium">Projects</h1>
						<Button
							variant="outlined"
							sx={{
								textTransform: "none",
								fontFamily: "Poppins",
								borderColor: "gray",
								color: "gray",
								fontSize: "13px",
							}}
							onClick={() => setOpenArchive(true)}
						>
							Archived
						</Button>
						<Drawer open={openArchive} onClose={() => setOpenArchive(false)}>
							<div className="border-b-2 border-slate-200 w-full flex items-center justify-between px-5 pb-4 pt-5">
								<h1 className="text-3xl font-bold text-center">Taska</h1>
								<IconButton
									onClick={() => setOpenArchive(false)}
									sx={{ color: "black" }}
								>
									<CloseIcon fontSize="large" sx={{ marginTop: "1px" }} />
								</IconButton>
							</div>
							{/* Archived Projects */}
							<div className="mt-6 flex flex-col gap-3 overflow-scroll px-12 w-96">
								<h1 className="text-xl font-bold mb-5">Archived Projects</h1>
								{projects
									.filter((t) => {
										return t.archive === true;
									})
									.map((t) => {
										return (
											<EachProject
												isActive={isProjectActive[t.index]}
												setIsActive={setIsProjectActive}
												data={t}
												avatars={avatars}
												key={t.index}
												projects={projects}
												setProjects={setProjects}
											/>
										);
									})}
							</div>
						</Drawer>
					</div>
					{/* Not Archived Projects */}
					<div className="mt-6 flex flex-col gap-3 overflow-scroll 2xl:h-[26rem] xl:h-[25rem] lg:h-[24rem] sm:h-80 h-72">
						{projects
							.filter((t) => {
								return t.archive !== true;
							})
							.map((t) => {
								return (
									<EachProject
										isActive={isProjectActive[t.index]}
										setIsActive={setIsProjectActive}
										data={t}
										avatars={avatars}
										key={t.index}
										projects={projects}
										setProjects={setProjects}
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
					pb={pb}
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
					projects={projects}
					setProjects={setProjects}
				/>
			</div>
		</>
	);
}
