import { useState, useRef } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/query";
import { updateTask, deleteTask } from "../utils/tasks";
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

export default function EditorTask({ data, openDialog, setOpenDialog }) {
	const titleRef = useRef(false);
	const discRef = useRef(false);
	const imgRef = useRef(false);
	const timeRef = useRef(false);
	const [value, setValue] = useState(0);
	const [task, editTask] = useState({
		id: data.id,
		User_email: data.User_email,
		Proj_title: data.Proj_title,
		title: data.title,
		description: data.description,
		image: data.image,
		time: data.time,
		status: data.status,
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const {
		data: updateTask_data,
		mutate: updateTask_mutate,
		isSuccess: updateTask_success,
		reset: updateTask_reset,
	} = useMutation({
		mutationFn: () => updateTask(data.id, task),
	});
	if (updateTask_success && updateTask_data) {
		setOpenDialog(false);
		queryClient.invalidateQueries(["tasks", data.Proj_title]);
		updateTask_reset();
	}
	const {
		data: deleteTask_data,
		mutate: deleteTask_mutate,
		isSuccess: deleteTask_success,
		reset: deleteTask_reset,
	} = useMutation({
		mutationFn: () => deleteTask(data.id, task),
	});
	if (deleteTask_success && deleteTask_data) {
		setOpenDialog(false);
		queryClient.invalidateQueries(["tasks", data.Proj_title]);
		deleteTask_reset();
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
					<Tab label="Edit/Delete Task" sx={{ fontFamily: "Poppins" }} />
				</Tabs>
				<div className="flex flex-col gap-4 md:px-14 px-8 md:py-12 py-8">
					<h1>Title:</h1>
					<TextField
						ref={titleRef}
						variant="outlined"
						className="md:w-72 w-full"
						placeholder={data.title}
						onChange={(e) =>
							editTask((perv) => {
								return { ...perv, title: e.target.value };
							})
						}
					/>
					<h1>Description:</h1>
					<TextField
						ref={discRef}
						variant="outlined"
						className="md:w-72 w-full"
						multiline
						placeholder={data.description}
						onChange={(e) =>
							editTask((perv) => {
								return { ...perv, description: e.target.value };
							})
						}
					/>
					<h1>
						Image <span className="text-xs">(Optional)</span>:
					</h1>
					<Button
						component="label"
						variant="outlined"
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}
						className="md:w-72 w-full"
					>
						Change Image
						<VisuallyHiddenInput
							ref={imgRef}
							type="file"
							accept="image/*"
							onChange={(e) =>
								editTask((perv) => {
									return { ...perv, image: e.target.files[0] };
								})
							}
						/>
					</Button>
					<h1>Schedule:</h1>
					<input
						ref={timeRef}
						type="date"
						min={today.toString()}
						max="2025-07-13"
						onChange={(e) =>
							editTask((perv) => {
								return { ...perv, time: e.target.value };
							})
						}
					/>
					<Button
						variant="contained"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
						onClick={() => {
							if (
								titleRef.current.firstChild.firstChild.value ||
								timeRef.current.value ||
								discRef.current.firstChild.firstChild.value ||
								imgRef.current.value
							) {
								updateTask_mutate();
							}
						}}
					>
						Edit Task
					</Button>
					<Button
						variant="contained"
						color="error"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
						onClick={() => {
							deleteTask_mutate();
						}}
					>
						Delete Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
