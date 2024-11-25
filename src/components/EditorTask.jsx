import { useState, useRef } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useQuery } from "@tanstack/react-query";
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
		index: data.index,
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const {
		refetch: updateTask_refetch,
		isError: updateTask_isError,
		error: updateTask_error,
		isFetched: updateTask_fetched,
	} = useQuery({
		queryKey: ["updateTask"],
		queryFn: () => updateTask(task.id, task),
		enabled: false,
	});
	const [flag, setFlag] = useState(false);
	if (updateTask_isError) console.log(updateTask_error);
	if (updateTask_fetched && flag) {
		window.location.reload();
	}
	const {
		refetch: deleteTask_refetch,
		isError: deleteTask_isError,
		error: deleteTask_error,
		isFetched: deleteTask_fetched,
	} = useQuery({
		queryKey: ["updateTask"],
		queryFn: () => deleteTask(task.id),
		enabled: false,
	});
	if (deleteTask_isError) console.log(deleteTask_error);
	if (deleteTask_fetched && flag) {
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
					<Tab label="Edit/Delete Task" sx={{ fontFamily: "Poppins" }} />
				</Tabs>
				<div className="flex flex-col gap-4 md:px-14 px-8 md:py-12 py-8">
					<label>Title:</label>
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
					<label>Description:</label>
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
					<label>Schedule:</label>
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
								setFlag(true);
								updateTask_refetch();
							} else {
								setFlag(false);
								setOpenDialog(false);
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
							setFlag(true);
							deleteTask_refetch();
						}}
					>
						Delete Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
