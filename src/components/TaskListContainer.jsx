import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
export default function TaskListContainer({ title }) {
	let dotColor =
		title === "To Do" ? "red" : title === "In Progress" ? "blue" : "green";
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<div className="w-max flex flex-col gap-5">
				<div className="flex justify-between">
					<div className="flex items-center gap-3">
						<CircleIcon
							sx={{ fontSize: "12px", marginBottom: "1px", color: dotColor }}
						/>
						<h1 className="font-medium 2xl:text-lg lg:text-base text-sm">
							{title}
						</h1>
						<span className="font-medium py-3 px-5 bg-white  w-4 h-4  flex items-center justify-center rounded-3xl lg:text-base text-sm">
							3
						</span>
					</div>
					<IconButton variant="text">
						<MoreVertIcon />
					</IconButton>
				</div>
				<Button
					variant="outlined"
					style={{
						fontFamily: "Poppins",
						backgroundColor: "white",
						color: "#546ee4",
						textTransform: "none",
					}}
					className="w-full lg:!mb-3 flex gap-1 !border-slate-200"
					onClick={() => setOpenDialog(true)}
				>
					<AddIcon fontSize="small" />
					Add New Task
				</Button>
				<AddTask
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
					status={title}
				/>
				{/* task place */}
				<div className="sm:overflow-scroll 2xl:h-[28rem] xl:h-[19rem] lg:h-[20rem] sm:h-[27rem] h-full flex flex-col gap-5 2xl:mb-1 xl:mb-3 lg:mb-2 mb-1">
					<Task />
					<Task />
					<Task />
				</div>
			</div>
		</>
	);
}
