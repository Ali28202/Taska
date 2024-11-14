import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ApartmentIcon from "@mui/icons-material/Apartment";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import SquareIcon from "@mui/icons-material/Square";
export default function AddProject({
	openDialog,
	setOpenDialog,
	projects,
	setProjects,
}) {
	const [value, setValue] = useState(0);
	const [invisible, setInvisible] = useState([false, true, true, true]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [textInput, setTextInput] = useState("");
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
					<Tab label="Add Project" sx={{ fontFamily: "Poppins" }} />
				</Tabs>
				<div className="flex flex-col gap-5 md:px-14 px-10 md:py-12 py-10">
					<label htmlFor="Email">Project Name:</label>
					<TextField
						label="Name"
						variant="outlined"
						className="md:w-72 w-full"
						onChange={(e) => {
							setTextInput(e.target.value);
						}}
					/>
					<label htmlFor="Avatar">Select Your Avatar:</label>
					<div className="flex flex-wrap sm:justify-normal justify-start items-center gap-4">
						<Badge variant="dot" color="success" invisible={invisible[0]}>
							<IconButton
								sx={{ padding: 0 }}
								onClick={() => {
									setInvisible(() => {
										let newArr = new Array(4);
										newArr.fill(true);
										newArr[0] = false;
										return newArr;
									});
								}}
							>
								<div className="bg-[#c5d8e7] px-2.5 py-1 rounded-xl w-fit h-fit">
									<ApartmentIcon className="md:!text-2xl !text-xl  text-black mb-0.5" />
								</div>
							</IconButton>
						</Badge>
						<Badge variant="dot" color="success" invisible={invisible[1]}>
							<IconButton
								sx={{ padding: 0 }}
								onClick={() => {
									setInvisible(() => {
										let newArr = new Array(4);
										newArr.fill(true);
										newArr[1] = false;
										return newArr;
									});
								}}
							>
								<div className="bg-[#e3f9fe] px-2.5 py-1 rounded-xl w-fit h-fit">
									<LanguageIcon className="!text-2xl text-[#73c6d8] mb-0.5" />
								</div>
							</IconButton>
						</Badge>
						<Badge variant="dot" color="success" invisible={invisible[2]}>
							<IconButton
								sx={{ padding: 0 }}
								onClick={() => {
									setInvisible(() => {
										let newArr = new Array(4);
										newArr.fill(true);
										newArr[2] = false;
										return newArr;
									});
								}}
							>
								<div className="bg-[#d8ebff] px-2.5 py-1 md:rounded-xl rounded-xl w-fit">
									<SendToMobileIcon className="xl:text-xl lg:text-2xl text-lg text-black mb-1" />
								</div>
							</IconButton>
						</Badge>
						<Badge variant="dot" color="success" invisible={invisible[3]}>
							<IconButton
								sx={{ padding: 0 }}
								onClick={() => {
									setInvisible(() => {
										let newArr = new Array(4);
										newArr.fill(true);
										newArr[3] = false;
										return newArr;
									});
								}}
							>
								<div className="bg-[#faeaff] px-2.5 py-1 md:rounded-xl rounded-xl w-fit">
									<SquareIcon className="xl:text-xl lg:text-2xl text-lg text-[#bd39ff] mb-1" />
								</div>
							</IconButton>
						</Badge>
					</div>
					<Button
						variant="contained"
						sx={{ fontFamily: "Poppins", textTransform: "none" }}
						onClick={() => {
							setProjects((projects) => {
								return [
									...projects,
									{
										title: textInput,
										avatarId: invisible.indexOf(false),
										id: projects.length.toString(),
									},
								];
							});
							setOpenDialog(false);
						}}
					>
						Add Project
					</Button>
				</div>
			</Dialog>
		</>
	);
}
