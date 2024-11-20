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
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import { useQuery } from "@tanstack/react-query";

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
export default function Auth({
	pb,
	authData,
	setAuthData,
	isLogged,
	setIsLogged,
}) {
	// create user
	const [newUserData, setNewUserData] = useState(null);
	// log in user
	const [existUserData, getExistUserData] = useState(null);
	// which user in

	const [openDialog, setOpenDialog] = useState(false);
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [showPassword, setShowPassword] = useState(false);
	const [isBarActive, setIsBarActive] = useState(false);
	const [signInError, getSignInError] = useState(false);
	const [signUpError, getSignUpError] = useState(false);
	async function signUp(data) {
		setIsBarActive(false);
		try {
			const record = await pb.collection("users").create(data);
			if (typeof record === "object") return record;
			else throw new Error(record);
		} catch (e) {
			console.log(e);
		}
	}
	async function signIn() {
		setIsBarActive(false);
		const authData = await pb
			.collection("users")
			.authWithPassword(existUserData.email, existUserData.password);
		return authData;
	}
	const {
		data: signIn_data,
		refetch: signIn_refetch,
		isError: signIn_error,
		isFetched: signIn_fetched,
		isPending: signIn_pending,
	} = useQuery({
		queryKey: ["signIn"],
		queryFn: signIn,
		enabled: false,
	});
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
									error={signInError}
									helperText={signInError && "Incorrect Entry"}
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
										error={signInError}
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
									{signInError && (
										<FormHelperText className="!text-red-600">
											Incorrect Entry
										</FormHelperText>
									)}
								</FormControl>
								<div className={isBarActive ? "flex gap-4 items-center" : ""}>
									<Button
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !isBarActive ? "100%" : "85%",
										}}
										// async problem
										onClick={() => {
											signIn_refetch();
											if (signIn_pending) {
											} else if (signIn_error) {
												getSignInError(true);
											} else {
												setAuthData(signIn_data);
												setIsLogged(true);
											}
										}}
									>
										Log In
									</Button>
									{isBarActive && (
										<div className="w-fit flex items-center justify-center mt-3">
											<CircularProgress size={"30px"} />
										</div>
									)}
								</div>
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
									error={signUpError}
									helperText={signUpError && "Incorrect Entry"}
									onChange={(e) => {
										setNewUserData((perv) => {
											return {
												...perv,
												email: e.target.value,
												emailVisibility: true,
											};
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
										error={signUpError}
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
									{signUpError && (
										<FormHelperText className="!text-red-600">
											Incorrect Entry
										</FormHelperText>
									)}
								</FormControl>
								<label>Your Name:</label>
								<TextField
									label="Name"
									variant="outlined"
									error={signUpError}
									helperText={signUpError && "Incorrect Entry"}
									onChange={(e) => {
										setNewUserData((perv) => {
											return { ...perv, name: e.target.value };
										});
									}}
								/>
								<div className={isBarActive ? "flex gap-4 items-center" : ""}>
									<Button
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !isBarActive ? "100%" : "85%",
										}}
										onClick={() => {
											signUp(newUserData).then((res) => {
												setIsBarActive(true);
												if (res) {
													setAuthData(newUserData);
													setIsLogged(true);
												} else {
													getSignUpError(true);
												}
											});
										}}
									>
										Create User
									</Button>
									{isBarActive && (
										<div className="w-fit flex items-center justify-center mt-3">
											<CircularProgress size={"30px"} />
										</div>
									)}
								</div>
							</div>
						</CustomTabPanel>
					</Dialog>
				</>
			)}
		</>
	);
}
