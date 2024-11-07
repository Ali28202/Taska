import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Projects from "./Projects";
import Auth from "./Auth";

export default function Navbar({ isLogged }) {
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	return (
		<>
			{/* Desktop */}
			<div
				className={`lg:flex hidden items-center xl:justify-between lg:justify-center lg:gap-48 mt-5 ${
					isLogged && "mb-5"
				} gap-5 lg:px-6 bg-white pb-5 w-full border-b-2 border-slate-200`}
			>
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
				<Auth isLogged={isLogged} />
			</div>
			{/* Mobile */}
			<div className="lg:hidden flex items-center justify-between mt-5 pr-6 pl-4 bg-white pb-5 w-full border-b-2 border-slate-200">
				<IconButton onClick={toggleDrawer(true)} sx={{ color: "black" }}>
					<MenuIcon fontSize="medium" />
				</IconButton>
				<SwipeableDrawer
					open={open}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					<div className="flex items-center justify-center flex-col gap-5">
						<div className="border-b-2 border-slate-200 w-full flex items-center justify-between px-5 pb-4 pt-5">
							<h1 className="text-3xl font-bold text-center">Taska</h1>
							<IconButton onClick={toggleDrawer(false)} sx={{ color: "black" }}>
								<CloseIcon fontSize="large" sx={{ marginTop: "1px" }} />
							</IconButton>
						</div>
						<div className="flex flex-col gap-5 border-b-2 border-slate-200 pb-8 px-8 pt-3">
							<Auth isLogged={isLogged} />
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
