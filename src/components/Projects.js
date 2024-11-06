import { useState } from "react";
import EachProject from "./EachProject";
import { Button } from "@mui/material";

export default function Projects({ className }) {
	const [isActive, setIsActive] = useState([1, 0, 0, 0, 0]);
	return (
		<>
			<div
				className={`${className} lg:border-r-2 border-slate-200 2xl:w-[20%] xl:w-[25%] lg:w-[35%] w-full flex-col px-10 lg:pt-6 pt-3 lg:h-[100vh]`}
			>
				<h1 className="text-2xl font-medium">Projects</h1>
				<div className="mt-6 flex flex-col gap-3 2xl:mb-[26rem] xl:mb-[19rem] lg:mb-72 mb-12">
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
					style={{ fontFamily: "Poppins" }}
					className="w-full !normal-case"
				>
					Add Project
				</Button>
			</div>
		</>
	);
}
