import { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
// back end
import PocketBase from "pocketbase";

const pb = new PocketBase("https://taska.liara.run");

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
function allyProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
export default function Auth({ isLogged, setIsLogged }) {
	const [newUserData, setNewUserData] = useState({
		email: "",
		emailVisibility: true,
		password: "",
		passwordConfirm: "",
		name: "",
	});
	const [existUserData, getExistUserData] = useState({
		email: "",
		password: "",
	});
	const [authData, getAuthData] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			{isLogged ? (
				<div className="flex items-center lg:justify-normal justify-between xl:gap-4 lg:gap-6">
					<div className="flex items-center gap-3">
						<Avatar sx={{ width: 32, height: 32, bgcolor: "blueviolet" }}>
							{authData?.name[0].toUpperCase()}
						</Avatar>
						<h1 className="xl:text-lg text-base">{authData?.name}</h1>
					</div>
					<IconButton
						color="error"
						className="xl:!p-3 lg:!p-2"
						onClick={() => {
							pb.authStore.clear();
							setOpenDialog(false);
							setIsLogged(false);
						}}
					>
						<ExitToAppIcon fontSize="medium" />
					</IconButton>
				</div>
			) : (
				<>
					<Button
						variant="contained"
						className="lg:!px-4 lg:!py-4 !px-6 !py-4 !text-xs xl:!text-base lg:!text-sm lg:w-48 !normal-case"
						sx={{ fontFamily: "Poppins" }}
						onClick={() => setOpenDialog(true)}
					>
						SignIn / SignUp
					</Button>
					<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
							centered
							variant="fullWidth"
						>
							<Tab
								label="Sign in"
								{...allyProps(0)}
								sx={{ fontFamily: "Poppins" }}
							/>
							<Tab
								label="Sign Up"
								{...allyProps(1)}
								sx={{ fontFamily: "Poppins" }}
							/>
						</Tabs>
						{/* Sign IN */}
						<CustomTabPanel value={value} index={0}>
							<div className="flex flex-col gap-3 md:px-10 px-3 md:py-5 py-3">
								<label>Email:</label>
								<TextField
									label="Email"
									variant="outlined"
									className="md:w-72 w-full"
									onChange={(e) => {
										getExistUserData((perv) => {
											return { ...perv, email: e.target.value };
										});
									}}
								/>
								<label>Password:</label>
								<FormControl variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">
										Password
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={showPassword ? "text" : "password"}
										onChange={(e) => {
											getExistUserData((perv) => {
												return { ...perv, password: e.target.value };
											});
										}}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label={
														showPassword
															? "hide the password"
															: "display the password"
													}
													onClick={() => setShowPassword((show) => !show)}
													onMouseDown={(e) => e.preventDefault()}
													onMouseUp={(e) => e.preventDefault()}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="Password"
									/>
								</FormControl>
								<Button
									variant="contained"
									sx={{
										fontFamily: "Poppins",
										textTransform: "none",
										marginTop: 2,
									}}
									onClick={() => {
										signIn(existUserData).then((res) => {
											getAuthData(res.record);
											setIsLogged(true);
										});
									}}
								>
									Submit
								</Button>
							</div>
						</CustomTabPanel>
						{/* Sign UP */}
						<CustomTabPanel value={value} index={1}>
							<div className="flex flex-col gap-3 md:px-10 px-3 md:py-5 py-3">
								<label>Email:</label>
								<TextField
									label="Email"
									type="email"
									variant="outlined"
									className="md:w-72 w-64"
									onChange={(e) => {
										setNewUserData((perv) => {
											return { ...perv, email: e.target.value };
										});
									}}
								/>
								<label>Password:</label>
								<FormControl variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">
										Password
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										type={showPassword ? "text" : "password"}
										onChange={(e) => {
											setNewUserData((perv) => {
												return {
													...perv,
													password: e.target.value,
													passwordConfirm: e.target.value,
												};
											});
										}}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label={
														showPassword
															? "hide the password"
															: "display the password"
													}
													onClick={() => setShowPassword((show) => !show)}
													onMouseDown={(e) => e.preventDefault()}
													onMouseUp={(e) => e.preventDefault()}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="Password"
									/>
								</FormControl>
								<label>Your Name:</label>
								<TextField
									label="Name"
									variant="outlined"
									onChange={(e) => {
										setNewUserData((perv) => {
											return { ...perv, name: e.target.value };
										});
									}}
								/>
								<Button
									variant="contained"
									sx={{
										fontFamily: "Poppins",
										textTransform: "none",
										marginTop: 2,
									}}
									onClick={() => {
										signUp(newUserData).then(() => {
											getAuthData(newUserData);
											setIsLogged(true);
										});
									}}
								>
									Submit
								</Button>
							</div>
						</CustomTabPanel>
					</Dialog>
				</>
			)}
		</>
	);
}

async function signUp(data) {
	const record = await pb.collection("users").create(data);
	return record;
}
async function signIn(data) {
	const authData = await pb
		.collection("users")
		.authWithPassword(data.email, data.password);
	return authData;
}
