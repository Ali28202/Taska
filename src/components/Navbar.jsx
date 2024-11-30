import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectsContainer from "./ProjectsContainer";
import Auth from "./Auth";
import { pb } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";
import { searchTask } from "../utils/tasks";
import ShowTask from "./showTask";
export default function Navbar({ projects }) {
	const [searchTerm, setSerachTerm] = useState("");
	const [selectedData, setSelectedData] = useState(null);
	const [showTask, toggleTask] = useState(false);
	const [open, setOpen] = useState(false);
	let content;
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	const { data, isFetched, isPending } = useQuery({
		queryKey: ["searchTask", { search: searchTerm }],
		queryFn: () => searchTask(searchTerm),
		enabled: searchTerm !== "",
	});
	if (isPending) {
		content = <CircularProgress />;
	}
	if (isFetched && data?.length) {
		content = (
			<div className="flex flex-col mt-3 gap-3 w-full">
				{data?.map((t) => {
					let statusColor =
						t.status === "to do"
							? "red"
							: t.status === "in progress"
							? "blue"
							: "green";
					return (
						<div
							className="hover:bg-gray-100 p-2 rounded-md duration-300 cursor-pointer"
							key={t.id}
							onClick={() => {
								setSelectedData(t);
								setSerachTerm("");
								toggleTask(true);
							}}
						>
							<div className="flex items-center gap-3">
								<SubtitlesIcon />
								<h1>{t.title}</h1>
							</div>
							<div className="flex flex-col gap-4 mt-3 text-sm ml-9">
								<div className="flex items-center gap-3">
									in project
									<span
										className="px-1 rounded-sm text-white text-base"
										style={{ backgroundColor: "darkgoldenrod" }}
									>
										{t.Proj_title}
									</span>
								</div>
								<div className="flex items-center gap-3">
									in list
									<span
										className="px-1 rounded-sm text-white text-base"
										style={{ backgroundColor: statusColor }}
									>
										{t.status.toUpperCase()}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	if (isFetched && !data?.length) {
		content = <span className="text-sm">nothing found:(</span>;
	}
	return (
		<>
			{/* Desktop */}
			<div
				className={`lg:flex hidden items-center lg:justify-end lg:gap-48 mt-5 ${
					pb.authStore.model ? "mb-5 xl:justify-between" : "xl:justify-end"
				} gap-5 lg:px-6 bg-white pb-5 w-full border-b-2 border-slate-200`}
			>
				{pb.authStore.model && (
					<div className="flex gap-5 flex-col sm:w-96">
						<TextField
							variant="outlined"
							placeholder="Search by title"
							className="bg-[#f7f7f7]  duration-300 "
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
							onChange={(e) => {
								setSerachTerm(e.target.value);
							}}
						/>
						{searchTerm && (
							<div className="fixed z-50 mt-16 bg-white border-[1px] border-slate-200 py-3 px-3 rounded-md 2xl:w-96 xl:w-96 lg:w-[13.6rem]">
								<h1>Tasks</h1>
								{content}
							</div>
						)}
					</div>
				)}
				<Auth />
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
						<div className="flex flex-col border-b-2 border-slate-200 pb-8 px-8 pt-3">
							<Auth />
							<TextField
								variant="outlined"
								placeholder="Search by title"
								className="bg-[#f7f7f7] w-full duration-300 border-b-2 border-slate-300 !mt-5"
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
								onChange={(e) => setSerachTerm(e.target.value)}
							/>
							{searchTerm && (
								<div className="border-[1px] border-slate-200 py-3 px-3 rounded-md mt-3">
									<h1>Tasks</h1>
									{content}
								</div>
							)}
						</div>
						{pb.authStore.model ? (
							<ProjectsContainer
								className={"lg:hidden flex"}
								projects={projects}
							/>
						) : (
							<span className="flex items-center justify-center pt-40 w-64 text-center text-gray-400">
								There is no Project Here. You Should Login First!!!
							</span>
						)}
					</div>
				</SwipeableDrawer>
				<a href="/">
					<h1 className="text-3xl font-bold">Taska</h1>
				</a>
			</div>
			{selectedData && (
				<ShowTask
					data={selectedData}
					openDialog={showTask}
					setOpenDialog={toggleTask}
				/>
			)}
		</>
	);
}
