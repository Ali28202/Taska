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

export default function AddTask({ openDialog, setOpenDialog }) {
	const [value, setValue] = useState(0);

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
					<Tab label="Add Task" sx={{ fontFamily: "Poppins" }} />
				</Tabs>
				<div className="flex flex-col gap-5 md:px-14 px-8 md:py-12 py-8">
					<label htmlFor="Title">Title:</label>
					<TextField
						label="Name"
						variant="outlined"
						className="md:w-72 w-full"
					/>
					<label htmlFor="Description">Description:</label>
					<TextField
						label="Description"
						variant="outlined"
						className="md:w-72 w-full"
						multiline
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
						Upload File
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => console.log(e.target.name)}
						/>
					</Button>
					<label htmlFor="Time">Schedule:</label>
					<input
						type="date"
						min="2024-07-11"
						max="2024-08-11"
						// e.target.value
						// onChange={(e) => console.log(e)}
					/>
					<Button
						variant="contained"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
					>
						Add Task
					</Button>
				</div>
			</Dialog>
		</>
	);
}
