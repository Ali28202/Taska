import { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function AddTask({
	tasks,
	setTasks,
	status,
	openDialog,
	setOpenDialog,
}) {
	const [value, setValue] = useState(0);
	const [newTask, addNewTask] = useState({
		title: "",
		description: "",
		src: "/",
		time: "",
		status: "",
		id: "",
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	let today = new Date().toISOString().split("T")[0];
	return (
		<>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					centered
					variant="fullWidth"
				>
					<Tab label="Add Task" sx={{ fontFamily: "Poppins" }} />
				</Tabs>
				<div className="flex flex-col gap-4 md:px-14 px-8 md:py-12 py-8">
					<label>Title:</label>
					<TextField
						label="Title"
						variant="outlined"
						className="md:w-72 w-full"
						required
						onChange={(e) =>
							addNewTask((perv) => {
								return { ...perv, title: e.target.value };
							})
						}
					/>
					<label>Description:</label>
					<TextField
						label="Description"
						variant="outlined"
						className="md:w-72 w-full"
						multiline
						required
						onChange={(e) =>
							addNewTask((perv) => {
								return { ...perv, description: e.target.value };
							})
						}
					/>
					<label>
						Image <span className="text-xs">(Optional)</span>:
					</label>
					<Button
						component="label"
						variant="outlined"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
						className="md:w-72 w-full"
					>
						Upload Image
						<VisuallyHiddenInput
							type="file"
							accept="image/*"
							onChange={(e) =>
								addNewTask((perv) => {
									return { ...perv, src: e.target.value.split("\\")[2] };
								})
							}
						/>
					</Button>
					<label>Schedule:</label>
					<input
						type="date"
						min={today.toString()}
						max="2025-07-13"
						required
						onChange={(e) =>
							addNewTask((perv) => {
								return { ...perv, time: e.target.value };
							})
						}
					/>
					<Button
						variant="contained"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
						onClick={() => {
							if (newTask.title && newTask.time && newTask.description) {
								setTasks(() => {
									newTask.status = status;
									newTask.id = tasks.length.toString();
									tasks.push(newTask);
									return tasks;
								});
								setOpenDialog(false);
							}
						}}
					>
						Add Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
