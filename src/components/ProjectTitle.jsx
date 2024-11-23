import { styled } from "@mui/material/styles";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import LanguageIcon from "@mui/icons-material/Language";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import SquareIcon from "@mui/icons-material/Square";
import ApartmentIcon from "@mui/icons-material/Apartment";
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

export default function ProjectTitle({ projects, idxActiveProject, tasks }) {
	let avatars = [
		// building
		<div className="bg-[#c5d8e7] md:p-4 p-3 rounded-xl w-fit h-fit">
			<ApartmentIcon className="md:!text-4xl !text-2xl  text-black" />
		</div>,
		// language
		<div className="bg-[#e3f9fe] md:p-4 p-3 rounded-xl w-fit h-fit">
			<LanguageIcon className="md:!text-4xl !text-2xl  text-[#73c6d8]" />
		</div>,
		// mobile
		<div className="bg-[#d8ebff] md:p-4 p-3 md:rounded-xl rounded-xl w-fit">
			<SendToMobileIcon className="md:!text-4xl !text-2xl text-black" />
		</div>,
		//square
		<div className="bg-[#faeaff] md:p-4 p-3 md:rounded-xl rounded-xl w-fit">
			<SquareIcon className="md:!text-4xl !text-2xl text-[#bd39ff]" />
		</div>,
	];
	let progress = 0;
	if (tasks) {
		tasks.forEach((task) => {
			if (task.status === "done") progress++;
		});
		progress = (progress / tasks.length) * 100;
		progress = Math.floor(progress);
	}
	return (
		<>
			<div className="flex items-center md:justify-normal justify-center lg:gap-8 gap-5 md:px-6 lg:py-0 lg:pb-4 md:py-4 py-4 border-b-2 border-slate-200">
				{avatars[projects[idxActiveProject]?.avatarId]}
				<div className="flex flex-col lg:gap-2 md:gap-3 gap-1">
					<h1 className="font-medium xl:text-2xl text-lg">
						{projects[idxActiveProject]?.archive && (
							<span className="text-slate-400 md:text-sm text-xs">
								archived&nbsp;
							</span>
						)}
						{projects[idxActiveProject]?.title}
					</h1>
					<div className="flex flex-row items-center gap-4 md:gap-5">
						<BorderLinearProgress
							variant="determinate"
							value={progress ? progress : 0}
							className="xl:w-80 md:w-72 w-44"
						/>
						<h2 className="xl:text-lg lg:text-base text-sm text-slate-600">
							{progress ? progress : 0}%{" "}
							<span className="md:inline hidden">complete</span>
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
