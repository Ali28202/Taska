import { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { queryClient } from "../utils/query";
import { useMutation } from "@tanstack/react-query";
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
	status,
	openDialog,
	setOpenDialog,
	project_title,
}) {
	let modal;
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
	});
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const {
		mutate: newTask_mutate,
		data: newTask_data,
		isSuccess: newTask_success,
		isPending: newTask_pending,
		reset: newTask_reset,
	} = useMutation({
		mutationFn: postTask,
	});
	if (newTask_pending) {
		modal = "";
	}
	if (newTask_success && !newTask_data?.code) {
		queryClient.invalidateQueries(["tasks", project_title]);
		newTask_reset();
		setOpenDialog(false);
	}
	if (newTask_success && newTask_data?.code) {
		modal = (
			<div
				className="bg-red-600 h-fit w-full rounded-md border-[1px] px-5 py-3 border-red-800"
				id="errModal"
			>
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs">
						{newTask_data.message}
					</span>
					<span className="h-0.5 w-full my-2 bg-slate-300"></span>
					<div className="flex flex-col gap-1 text-white sm:text-base text-sm">
						{newTask_data.data?.map((t) => {
							return <span key={t[0]}>{t[0]}</span>;
						})}
					</div>
				</div>
			</div>
		);
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
				<div
					className="flex flex-col gap-4 md:px-14 px-8 md:py-8 py-8"
					id="addTaskForm"
				>
					{modal}
					<h1>Title:</h1>
					<TextField
						id="title"
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
					<h1>Description:</h1>
					<TextField
						id="description"
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
					<h1>Schedule:</h1>
					<input
						id="date"
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
							formData.append("description", newTask.description.toString());
							newTask.image !== "" &&
								formData.append(
									"image",
									new Blob([newTask.image]),
									newTask.image.name
								);
							formData.append("time", newTask.time.toString());
							newTask_mutate(formData);
						}}
					>
						Add Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
