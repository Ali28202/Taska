import { useState } from "react";
import EachProject from "./EachProject";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProject from "./AddProject";
export default function Projects({ className }) {
	const [isActive, setIsActive] = useState([1, 0, 0, 0, 0]);
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<div
				className={`${className} lg:border-r-2 border-slate-200 2xl:w-[20%] xl:w-[25%] lg:w-[35%] w-full flex-col px-10 lg:pt-6 pt-3 2xl:h-[91.5vh] xl:h-[90vh] justify-between`}
			>
				<div>
					<h1 className="text-2xl font-medium">Projects</h1>
					<div className="mt-6 flex flex-col gap-3 overflow-scroll 2xl:h-[26rem] xl:h-[25rem] lg:h-[24rem] sm:h-80 h-72">
						<EachProject
							isActive={isActive[0]}
							setIsActive={setIsActive}
							index={0}
						/>
						<EachProject
							isActive={isActive[1]}
							setIsActive={setIsActive}
							index={1}
						/>
						<EachProject
							isActive={isActive[2]}
							setIsActive={setIsActive}
							index={2}
						/>
						<EachProject
							isActive={isActive[3]}
							setIsActive={setIsActive}
							index={3}
						/>
						<EachProject
							isActive={isActive[4]}
							setIsActive={setIsActive}
							index={4}
						/>
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
				<AddProject openDialog={openDialog} setOpenDialog={setOpenDialog} />
			</div>
		</>
	);
}
