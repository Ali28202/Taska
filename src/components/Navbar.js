// import { FaRegBuilding } from "react-icons/fa";
// import { styled } from "@mui/material/styles";
import * as React from "react";
import { Button } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import Projects from "./Projects";
// import LinearProgress, {
// 	linearProgressClasses,
// } from "@mui/material/LinearProgress";
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
// 	height: 10,
// 	borderRadius: 3,
// 	[`&.${linearProgressClasses.colorPrimary}`]: {
// 		backgroundColor: theme.palette.grey[200],
// 	},
// 	[`& .${linearProgressClasses.bar}`]: {
// 		borderRadius: 5,
// 		backgroundColor: "#1a90ff",
// 	},
// }));

export default function Navbar() {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	return (
		<>
			{/* Desktop */}
			<h1 className="lg:flex hidden justify-center items-center text-3xl font-bold py-5 border-b-2 border-slate-200">
				Taska
			</h1>
			<div className="lg:flex hidden items-center xl:justify-between lg:justify-center lg:gap-48 my-5 lg:right-0 lg:fixed gap-5 lg:px-6 bg-white pb-5 2xl:w-[80%] xl:w-[75%] lg:w-[65%] w-full border-b-2 border-slate-200">
				{/* <div className="flex items-center md:gap-5 gap-3">
					<div className="bg-[#c5d8e7] md:p-5 p-3 md:rounded-3xl rounded-xl">
						<FaRegBuilding className="xl:text-4xl lg:text-3xl md:text-2xl text-xl" />
					</div>
					<div className="flex flex-col xl:gap-3 gap-2">
						<h1 className="font-medium xl:text-2xl lg:text-xl">
							Piper Enterprise
						</h1>
						<div className="flex md:flex-row flex-col md:items-center items-start gap-2 md:gap-5">
							<BorderLinearProgress
								variant="determinate"
								value={13}
								className="xl:w-80 lg:w-64 md:w-48 w-44"
							/>
							<h2 className="xl:!text-lg lg:!text-base text-sm md:block hidden">
								13% complete
							</h2>
						</div>
					</div>
				</div> */}
				<TextField
					variant="outlined"
					placeholder="Search..."
					className="bg-[#f7f7f7] sm:w-96 w-[21rem]  duration-300"
					sx={{ fontFamily: "Poppins" }}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						},
					}}
				/>
				<Button
					variant="contained"
					className="lg:!px-4 lg:!py-4 !px-6 !py-4 !text-xs xl:!text-base lg:!text-sm lg:w-48 !normal-case"
					sx={{ fontFamily: "Poppins" }}
				>
					Login / SignUp
				</Button>
			</div>
			{/* Mobile */}
			<div className="lg:hidden flex items-center justify-between my-5 pr-6 bg-white pb-5 w-full border-b-2 border-slate-200">
				<Button onClick={toggleDrawer(true)} sx={{ color: "black" }}>
					<MenuIcon fontSize="medium" />
				</Button>
				<SwipeableDrawer
					open={open}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					<div className="flex items-center justify-center flex-col gap-5">
						<div className="border-b-2 border-slate-200 w-full flex items-center justify-between px-5 pb-4 pt-5">
							<h1 className="text-3xl font-bold text-center ">Taska</h1>
							<IconButton onClick={toggleDrawer(false)} sx={{ color: "black" }}>
								<CloseIcon fontSize="large" />
							</IconButton>
						</div>
						<div className="flex flex-col gap-5 border-b-2 border-slate-200 pb-8 px-8 pt-3">
							<Button
								variant="contained"
								className="!px-6 !py-4 !text-sm !normal-case"
								sx={{ fontFamily: "Poppins" }}
							>
								Login / SignUp
							</Button>
							<TextField
								variant="outlined"
								placeholder="Search..."
								className="bg-[#f7f7f7] w-54 duration-300 border-b-2 border-slate-300"
								sx={{ fontFamily: "Poppins" }}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										),
									},
								}}
							/>
						</div>
						<Projects className={"lg:hidden flex"} />
					</div>
				</SwipeableDrawer>
				<a href="/">
					<h1 className="text-3xl font-bold">Taska</h1>
				</a>
			</div>
		</>
	);
}
