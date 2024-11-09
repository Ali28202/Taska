import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
export default function TaskListContainer({ title, data }) {
	let dotColor =
		title === "To Do" ? "red" : title === "In Progress" ? "blue" : "green";
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<div className="w-max flex flex-col gap-5">
				<div className="flex justify-between 2xl:w-96 xl:w-80 w-72">
					<div className="flex items-center gap-3">
						<CircleIcon
							sx={{ fontSize: "12px", marginBottom: "1px", color: dotColor }}
						/>
						<h1 className="font-medium 2xl:text-lg lg:text-base text-sm">
							{title}
						</h1>
						<span className="font-medium py-3 px-5 bg-white  w-4 h-4  flex items-center justify-center rounded-3xl lg:text-base text-sm">
							{data.length}
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
				<AddTask openDialog={openDialog} setOpenDialog={setOpenDialog} />
				{/* task place */}
				<section
					className="sm:overflow-scroll 2xl:h-[33rem] xl:h-[24rem] lg:h-[25rem] md:h-[27rem] h-[29rem] flex flex-col gap-5 2xl:mb-1 xl:mb-3 lg:mb-2 mb-1 rounded-2xl"
					onDrop={(e) => {
						e.preventDefault();
						let d = e.dataTransfer.getData("id");
						// let ourData = data.filter((t) => t.id === d);
						// should change new data with old one
						// console.log(d, ourData);
						if (e.target.matches("section")) {
							e.target.appendChild(document.getElementById(d));
							e.target.classList.remove("bg-gray-300");
						}
					}}
					onDragOver={(e) => {
						e.preventDefault();
						if (e.target.matches("section")) {
							e.target.classList.add("bg-gray-300");
						}
					}}
					onDragLeave={(e) => {
						e.preventDefault();
						if (e.target.matches("section")) {
							e.target.classList.remove("bg-gray-300");
						}
					}}
				>
					{data.map((t) => {
						return (
							<Task
								id={t.id}
								data={t}
								key={t.title}
								status={title.toLowerCase()}
							/>
						);
					})}
				</section>
			</div>
		</>
	);
}
