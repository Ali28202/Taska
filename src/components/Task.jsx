import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
export default function Task({
	id,
	data,
	toggleEditor,
	setSelectedItem,
	toggleTask,
}) {
	let today = new Date().toISOString().split("T")[0];
	// in array : first = year,second = month, third = day
	let taskTime = data.time.split("-");
	today = today.split("-");
	let bgColorDate, textColorDate;
	if (taskTime[1] === today[1]) {
		if (taskTime[2] - today[2] >= 7) {
			bgColorDate = "#bbf7d0";
			textColorDate = "#16a34a";
		} else if ((taskTime[2] - today[2] < 7) & (taskTime[2] - today[2] > 2)) {
			bgColorDate = "#fef08a";
			textColorDate = "#ca8a04";
		} else {
			bgColorDate = "#fecaca";
			textColorDate = "#dc2626";
		}
	} else {
		bgColorDate = "#bbf7d0";
		textColorDate = "#16a34a";
	}
	return (
		<>
			<div
				className="w-full bg-white pl-5 pr-3 pt-5 rounded-md border-slate-200 border-[2px] cursor-pointer h-64"
				draggable
				onClick={() => {
					setSelectedItem(data);
					toggleTask(true);
				}}
				id={id}
				onDragStart={(e) => {
					e.dataTransfer.setData("id", e.target.id);
					e.dataTransfer.dropEffect = "move";
				}}
			>
				<div className="flex justify-between items-center">
					<h1
						className="w-fit py-2 px-4 rounded-3xl font-medium 2xl:text-base lg:text-sm text-xs"
						style={{ backgroundColor: bgColorDate, color: textColorDate }}
					>
						{data.time}
					</h1>
					<IconButton
						variant="text"
						sx={{ padding: 1.5 }}
						onClick={(e) => {
							e.stopPropagation();
							setSelectedItem(data);
							toggleEditor(true);
						}}
					>
						<EditIcon sx={{ fontSize: "25px" }} />
					</IconButton>
				</div>
				<div className="flex flex-col gap-5 mt-5">
					<h1 className="lg:text-xl text-lg font-medium">{data.title}</h1>
					<p className="2xl:w-80 xl:w-64 lg:w-56 lg:text-sm text-xs text-gray-500 leading-relaxed">
						{data.description}
					</p>
					{data.src !== "/" && (
						<div className="flex items-center gap-3 w-fit p-2 rounded-xl border-slate-200 border-[1px]">
							<AttachFileIcon fontSize="small" />
							<span className="lg:text-sm text-xs w-24 overflow-hidden">
								{data.src}
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
