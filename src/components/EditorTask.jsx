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

export default function EditorTask({
	data,
	tasks,
	setTasks,
	openDialog,
	setOpenDialog,
}) {
	const [value, setValue] = useState(0);
	const [task, editTask] = useState({
		title: data.title,
		description: data.description,
		src: data.src,
		time: data.time,
		status: data.status,
		id: data.id,
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
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
					<label htmlFor="Title">Title:</label>
					<TextField
						label="Title"
						variant="outlined"
						className="md:w-72 w-full"
						placeholder={data.title}
						onChange={(e) =>
							editTask((perv) => {
								return { ...perv, title: e.target.value };
							})
						}
					/>
					<label htmlFor="Description">Description:</label>
					<TextField
						label="Description"
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
					<label htmlFor="Img">
						Img <span className="text-xs">(Optional)</span>:
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
							type="file"
							accept="image/*"
							onChange={(e) =>
								editTask((perv) => {
									return { ...perv, src: e.target.value.split("\\")[2] };
								})
							}
						/>
					</Button>
					<label htmlFor="Time">Schedule:</label>
					<input
						type="date"
						min="2024-07-13"
						max="2025-07-13"
						value={data.time}
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
							if (task.title && task.time && task.description) {
								setTasks(() => {
									let newTasks = tasks.toSpliced(+data.id, 1, task);
									return newTasks;
								});
								setOpenDialog(false);
							}
						}}
					>
						Edit Task
					</Button>
					<Button
						variant="contained"
						color="warning"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
						onClick={() => {
							setTasks(() => {
								let newTasks = tasks.toSpliced(+data.id, 1);
								return newTasks;
							});
							setOpenDialog(false);
						}}
					>
						Delete Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
