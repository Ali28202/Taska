import { useState } from "react";
import EachProject from "./EachProject";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Projects({ className }) {
	const [isActive, setIsActive] = useState([1, 0, 0, 0, 0]);
	return (
		<>
			<div
				className={`${className} lg:border-r-2 border-slate-200 2xl:w-[20%] xl:w-[25%] lg:w-[35%] w-full flex-col px-10 lg:pt-6 pt-3 lg:h-full`}
			>
				<h1 className="text-2xl font-medium">Projects</h1>
				<div className="mt-6 flex flex-col gap-3 2xl:mb-[20rem] xl:mb-[14rem] lg:mb-60 sm:mb-20 mb-28 overflow-scroll 2xl:h-[26rem] xl:h-[25rem] lg:h-[24rem] sm:h-80 h-72">
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
				<Button
					variant="outlined"
					style={{ fontFamily: "Poppins", borderStyle: "dashed" }}
					className="w-full !normal-case lg:!mb-3 flex gap-1"
				>
					<AddIcon fontSize="small" />
					Add Project
				</Button>
			</div>
		</>
	);
}
