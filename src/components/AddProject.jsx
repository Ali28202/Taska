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
import { pb } from "../utils/auth";
import { postProject } from "../utils/project";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/query";
export default function AddProject({ openDialog, setOpenDialog, projects }) {
	const [value, setValue] = useState(0);
	const [invisible, setInvisible] = useState([false, true, true, true]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [textInput, setTextInput] = useState("");
	let errModal;
	let newProject = {
		User_email: pb.authStore.model?.email,
		title: textInput,
		archive: false,
		index: projects?.length,
		avatarId: invisible.indexOf(false),
	};
	const {
		mutate: setProject_mutate,
		data: setProject_data,
		isPending: setProject_pending,
		isSuccess: setProject_success,
		reset: setProject_reset,
	} = useMutation({
		mutationFn: postProject,
	});
	if (setProject_pending) errModal = <></>;
	if (setProject_success && setProject_data.code) {
		errModal = (
			<div className="bg-red-600 h-fit md:w-72 w-full rounded-md border-[1px] px-5 py-3 border-red-800">
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs mt-2">
						{setProject_data.message}
					</span>
				</div>
			</div>
		);
	}
	if (setProject_success && !setProject_data.code) {
		queryClient.invalidateQueries(["projects"]);
		setOpenDialog(false);
		setProject_reset();
	}
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
					{errModal}
					<label>Project Name:</label>
					<TextField
						label="Name"
						variant="outlined"
						className="md:w-72 w-full"
						required
						onChange={(e) => {
							setTextInput(e.target.value);
						}}
					/>
					<label>Select Your Avatar:</label>
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
							setProject_mutate(newProject);
							setTextInput("");
						}}
					>
						Add Project
					</Button>
				</div>
			</Dialog>
		</>
	);
}
