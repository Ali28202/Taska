import { FaRegBuilding } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 3,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: "#1a90ff",
	},
}));

export default function ProjectTitle() {
	return (
		<>
			<div className="flex items-center md:justify-normal justify-center lg:gap-8 gap-5 md:px-6 lg:pt-3 md:py-7 py-5 border-b-2 border-slate-200">
				<div className="bg-[#c5d8e7] md:p-5 p-3 md:rounded-2xl rounded-xl">
					<FaRegBuilding className="xl:text-4xl md:text-3xl text-2xl" />
				</div>
				<div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-3 gap-1">
					<h1 className="font-medium xl:text-2xl text-lg">Piper Enterprise</h1>
					<div className="flex flex-row items-center gap-4 md:gap-5">
						<BorderLinearProgress
							variant="determinate"
							value={13}
							className="xl:w-80 md:w-72 w-44"
						/>
						<h2 className="xl:text-lg lg:text-base text-sm text-slate-600">
							13% <span className="md:inline hidden">complete</span>
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
