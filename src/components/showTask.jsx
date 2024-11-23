import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from "@mui/icons-material/Subject";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import ImageIcon from "@mui/icons-material/Image";
import { pb } from "../utils/auth";
export default function ShowTask({ data, openDialog, setOpenDialog }) {
	let today = new Date().toISOString().split("T")[0];
	// in array : first = year,second = month, third = day
	let taskTime = data.time.split("-");
	today = today.split("-");
	let bgColorDate, textColorDate;
	const imgSrc = pb.files.getUrl(data, data.image, { token: "" });
	if (data.status === "done") {
		bgColorDate = "#bbf7d0";
		textColorDate = "#16a34a";
	} else {
		if (taskTime[1] === today[1]) {
			if (taskTime[2] - today[2] >= 7) {
				bgColorDate = "#bbf7d0";
				textColorDate = "#16a34a";
			} else if (taskTime[2] - today[2] < 7 && taskTime[2] - today[2] > 2) {
				bgColorDate = "#fef08a";
				textColorDate = "#ca8a04";
			} else {
				bgColorDate = "#fecaca";
				textColorDate = "#dc2626";
			}
		} else {
			bgColorDate = "#bbf7d0";
			textColorDate = "#16a34a";
		}
	}
	let bgStatusColor =
		data.status === "to do"
			? "red"
			: data.status === "in progress"
			? "blue"
			: "green";
	return (
		<>
			<Dialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				fullWidth={true}
				maxWidth={"md"}
			>
				<div
					className="h-12 opacity-75"
					style={{ backgroundColor: bgStatusColor }}
				></div>
				<div className="flex flex-col gap-6 md:px-10 px-8 md:py-12 py-8">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-5">
							<SubtitlesIcon />
							<div>
								<h1 className="text-xl font-semibold">{data.title}</h1>
								<h2 className="flex sm:flex-row flex-col sm:gap-2 sm:items-center sm:mt-0 mt-2">
									in list
									<span
										className="text-sm p-1 rounded-sm text-white opacity-75"
										style={{ backgroundColor: bgStatusColor }}
									>
										{data.status.toUpperCase()}
									</span>
								</h2>
							</div>
						</div>
						<IconButton
							onClick={() => setOpenDialog(false)}
							sx={{ color: "black" }}
						>
							<CloseIcon fontSize="large" sx={{ marginTop: "1px" }} />
						</IconButton>
					</div>
					<div className="flex flex-col justify-center gap-6 sm:pr-0 pr-20">
						<div className="flex items-center gap-5">
							<SubjectIcon />
							<h1 className="text-lg font-medium">Description</h1>
						</div>
						<textarea
							className="sm:ml-11 mr-64 border-2 p-3 resize-none rounded-md sm:w-auto w-fit"
							value={data.description}
							disabled
						>
							{data.description}
						</textarea>
					</div>
					<div className="flex flex-col gap-4 items-start">
						<div className="flex items-center gap-4">
							<ImageIcon />
							<h1 className="text-xl font-semibold">Image</h1>
						</div>
						{data.src === "/" ? (
							<span>No Image Attached</span>
						) : (
							<img
								src={imgSrc}
								alt="img"
								className="md:w-48 md:h-48 md:mt-2 md:ml-2 w-28 h-28"
							/>
						)}
					</div>
					<div className="flex sm:flex-row flex-col sm:items-center gap-5">
						<div className="flex flex-row gap-3">
							<DateRangeIcon />
							<h1 className="text-lg font-medium">Due date : </h1>
						</div>
						<span
							className="mt-0.5 text-base font-medium px-3 py-3 rounded-3xl w-fit"
							style={{ backgroundColor: bgColorDate, color: textColorDate }}
						>
							{data.time}
						</span>
					</div>
				</div>
			</Dialog>
		</>
	);
}
