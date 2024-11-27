import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { pb } from "../utils/auth";

export default function Auth() {
	let navigate = useNavigate();
	return (
		<>
			{pb.authStore.model ? (
				<div className="flex items-center lg:justify-normal justify-between xl:gap-4 lg:gap-6">
					<div className="flex items-center gap-3">
						<Avatar sx={{ width: 32, height: 32, bgcolor: "blueviolet" }}>
							{pb.authStore.model && pb.authStore.model.name[0].toUpperCase()}
						</Avatar>
						<h1 className="xl:text-lg text-base">{pb.authStore.model?.name}</h1>
					</div>
					<IconButton
						color="error"
						className="xl:!p-3 lg:!p-2"
						onClick={() => {
							pb.authStore.clear();
							localStorage.clear();
							navigate("/auth");
							// navigate(0);
						}}
					>
						<ExitToAppIcon fontSize="medium" />
					</IconButton>
				</div>
			) : (
				<Button
					variant="contained"
					className="lg:!px-4 lg:!py-4 !px-6 !py-4 !text-xs xl:!text-base lg:!text-sm lg:w-48 !normal-case"
					sx={{ fontFamily: "Poppins" }}
					onClick={() => {
						navigate("/auth");
					}}
				>
					SignIn / SignUp
				</Button>
			)}
		</>
	);
}
