import { FaRegBuilding } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
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

export default function Navbar() {
	return (
		<>
			{/* Desktop */}
			<div className="flex items-center justify-between my-5 lg:right-0 lg:fixed gap-5 lg:px-10 md:px-6 px-4 bg-white pb-5 lg:w-[80%] w-full border-b-[1px] border-black/25">
				<div className="flex items-center md:gap-5 gap-3">
					<div className="bg-[#c5d8e7] md:p-5 p-3 md:rounded-3xl rounded-xl">
						<FaRegBuilding className="xl:text-4xl lg:text-3xl md:text-2xl text-xl" />
					</div>
					<div className="flex flex-col xl:gap-3 gap-2">
						<h1 className="font-medium xl:text-2xl lg:text-xl">
							Piper Enterprise
						</h1>
						<div className="flex md:flex-row flex-col md:items-center items-start gap-2 md:gap-5">
							<BorderLinearProgress
								variant="determinate"
								value={13}
								className="xl:w-80 lg:w-64 md:w-48 w-44"
							/>
							<h2 className="xl:!text-lg lg:!text-base text-sm md:block hidden">
								13% complete
							</h2>
						</div>
					</div>
				</div>
				<div>
					<Button
						variant="contained"
						className="lg:!p-4 !p-3 !text-xs xl:!text-base lg:!text-sm"
					>
						Login / SignUp
					</Button>
				</div>
			</div>
		</>
	);
}
