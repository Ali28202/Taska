import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
export default function Task({ index, data }) {
	return (
		<>
			<div
				className="w-full bg-white pl-5 pr-3 py-3 rounded-2xl border-slate-200 border-[1px]"
				draggable
				id={index}
				onDragStart={(e) => {
					e.dataTransfer.setData("id", e.target.id);
					e.dataTransfer.dropEffect = "move";
				}}
			>
				<div className="flex justify-between items-center">
					<h1 className="bg-green-200 text-green-600 w-fit py-2 px-4 rounded-3xl font-medium 2xl:text-base lg:text-sm text-xs">
						{data.time}
					</h1>
					<IconButton variant="text">
						<MoreVertIcon sx={{ fontSize: "30px" }} />
					</IconButton>
				</div>
				<div className="flex flex-col gap-5 mt-5">
					<h1 className="lg:text-xl text-lg font-medium">{data.title}</h1>
					<p className="2xl:w-80 xl:w-64 lg:w-56 lg:text-sm text-xs text-gray-500 leading-relaxed">
						{data.description}
					</p>
					<div className="flex items-center gap-3 w-fit p-2 rounded-xl border-slate-200 border-[1px]">
						<AttachFileIcon fontSize="small" />
						<span className="lg:text-sm text-xs">Img Title</span>
					</div>
				</div>
			</div>
		</>
	);
}
