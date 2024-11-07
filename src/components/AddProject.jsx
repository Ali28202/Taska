import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaRegBuilding } from "react-icons/fa";
export default function AddProject({ openDialog, setOpenDialog }) {
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
					<Tab label="Add Project" />
				</Tabs>
				<div className="flex flex-col gap-5 md:px-14 px-3 md:py-12 py-3">
					<label htmlFor="Email">Project Name:</label>
					<TextField
						label="Name"
						variant="outlined"
						className="md:w-72 w-full"
					/>
					<label htmlFor="Avatar">Select Your Avatar:</label>
					<div className="flex flex-wrap sm:justify-normal justify-center items-center gap-4">
						<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
							<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
						</div>
						<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
							<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
						</div>
						<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
							<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
						</div>
						<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
							<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
						</div>
						<div className="bg-[#c5d8e7] p-3 md:rounded-xl rounded-xl w-fit">
							<FaRegBuilding className="xl:text-xl lg:text-2xl text-lg text-black" />
						</div>
					</div>
					<Button
						variant="contained"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
					>
						Add Project
					</Button>
				</div>
			</Dialog>
		</>
	);
}
