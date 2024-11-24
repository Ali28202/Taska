import { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useQuery } from "@tanstack/react-query";
import { postTask } from "../utils/tasks";
import { pb } from "../utils/auth";
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
	project_title,
}) {
	const formData = new FormData();
	const [value, setValue] = useState(0);
	const [newTask, addNewTask] = useState({
		User_email: pb.authStore.model.email,
		Proj_title: "",
		title: "",
		description: "",
		image: "",
		time: "",
		status: status,
		index: "",
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const {
		data: newTask_data,
		isFetched: newTask_fetched,
		isError: newTask_isError,
		error: newTask_error,
		refetch: newTask_refetch,
	} = useQuery({
		queryKey: ["addTask"],
		queryFn: () => postTask(formData),
		enabled: false,
	});
	if (newTask_isError) console.log(newTask_error);
	if (newTask_fetched && newTask_data) {
		setTasks(() => {
			newTask.Proj_title = project_title;
			newTask.index = tasks.length.toString();
			tasks.push(newTask);
			return tasks;
		});
		window.location.reload();
	}
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
						onChange={(e) => {
							addNewTask((perv) => {
								return { ...perv, title: e.target.value };
							});
						}}
					/>
					<label>Description:</label>
					<TextField
						label="Description"
						variant="outlined"
						className="md:w-72 w-full"
						multiline
						required
						onChange={(e) => {
							addNewTask((perv) => {
								return { ...perv, description: e.target.value };
							});
						}}
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
							onChange={(e) => {
								addNewTask((perv) => {
									return {
										...perv,
										image: e.target.files[0],
									};
								});
							}}
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
							formData.append("title", newTask.title.toString());
							formData.append("User_email", newTask.User_email.toString());
							formData.append("Proj_title", project_title);
							formData.append("status", newTask.status.toString());
							formData.append("index", tasks.length);
							formData.append("description", newTask.description.toString());
							newTask.image !== "" &&
								formData.append(
									"image",
									new Blob([newTask.image]),
									newTask.image.name
								);
							formData.append("time", newTask.time.toString());
							console.log(formData.get("image"));
							if (newTask.title && newTask.time && newTask.description) {
								newTask_refetch();
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
