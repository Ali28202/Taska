import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import EditorTask from "./EditorTask";
import ShowTask from "./showTask";
import { useDrop } from "react-dnd";
export default function TaskListContainer({
	title,
	name,
	tasks,
	moveTask,
	project_title,
}) {
	let dotColor =
		title === "To Do" ? "red" : title === "In Progress" ? "blue" : "green";
	let data = tasks?.filter((t) => {
		return t.status === title.toLowerCase();
	});
	const [openDialog, setOpenDialog] = useState(false);
	const [isEditorOpen, toggleEditor] = useState(false);
	const [isTaskOpen, toggleTask] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [{ isOver }, drop] = useDrop({
		accept: "TASK",
		drop: (draggedItem) => {
			moveTask(draggedItem.id, name);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	return (
		<>
			<div
				className="w-max flex flex-col gap-5"
				id={`taskListContainer-${name.replace(/ +/g, "")}`}
			>
				<div className="flex justify-between 2xl:w-96 xl:w-80 w-72">
					<div className="flex items-center gap-3">
						<CircleIcon
							sx={{ fontSize: "12px", marginBottom: "1px", color: dotColor }}
						/>
						<h1 className="font-medium 2xl:text-lg lg:text-base text-sm">
							{title}
						</h1>
						<span className="font-medium py-3 px-5 bg-white  w-4 h-4  flex items-center justify-center rounded-3xl lg:text-base text-sm">
							{data?.length || 0}
						</span>
					</div>
					<IconButton variant="text">
						<MoreVertIcon />
					</IconButton>
				</div>
				<Button
					id="addTask"
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
					status={title.toLowerCase()}
					project_title={project_title}
				/>
				{/* task place */}
				<section
					ref={drop}
					className="sm:overflow-scroll 2xl:h-[35.5rem] xl:h-[28rem] lg:h-[28.3rem] md:h-[30.5rem] h-[31.5rem] flex flex-col gap-5 2xl:mb-1 xl:mb-3 lg:mb-2 mb-1 rounded-md"
					style={{ backgroundColor: isOver ? "#cbd5e1" : "initial" }}
				>
					{data?.map((t) => {
						return (
							<div key={t.id}>
								<Task
									data={t}
									isOver={isOver}
									toggleEditor={toggleEditor}
									toggleTask={toggleTask}
									setSelectedItem={setSelectedItem}
								/>
							</div>
						);
					})}
					{selectedItem && (
						<ShowTask
							data={selectedItem}
							openDialog={isTaskOpen}
							setOpenDialog={toggleTask}
						/>
					)}
					{selectedItem && (
						<EditorTask
							data={selectedItem}
							openDialog={isEditorOpen}
							setOpenDialog={toggleEditor}
						/>
					)}
				</section>
			</div>
		</>
	);
}
