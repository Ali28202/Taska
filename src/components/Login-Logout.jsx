import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import { pb, signIn, signUp } from "../utils/auth";
import { useNavigate } from "react-router-dom";
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
export default function LOGIN_LOGOUT() {
	let navigate = useNavigate();
	let signInModal;
	let signUpModal;
	useEffect(() => {
		if (pb.authStore.model) {
			navigate("/project");
		}
	}, [pb.authStore]);
	const {
		refetch: signIn_refetch,
		data: signIn_data,
		isFetched: signIn_fetched,
		isLoading: signIn_loading,
	} = useQuery({
		queryKey: ["signIn"],
		queryFn: () => signIn(existUserData || ""),
		enabled: false,
	});
	const {
		refetch: signUp_refetch,
		isError: signUp_error,
		isFetched: signUp_fetched,
		isLoading: signUp_loading,
	} = useQuery({
		queryKey: ["signUp"],
		queryFn: () => signUp(newUserData || ""),
		enabled: false,
	});
	// getting data from signup page
	const [newUserData, setNewUserData] = useState(null);
	// getting data from signin page
	const [existUserData, getExistUserData] = useState(null);
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [showPassword, setShowPassword] = useState(false);
	let isSignInBarActive = false;
	let isSignUpBarActive = false;
	if (signIn_loading) {
		isSignInBarActive = true;
	} else {
		isSignInBarActive = false;
	}
	if (signIn_fetched) {
		signInModal = <></>;
	}
	if (signIn_fetched && signIn_data?.code) {
		signInModal = (
			<div className="bg-red-600 h-fit w-full rounded-md border-[1px] px-5 py-3 border-red-800">
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs">
						{signIn_data.message}
					</span>
					<span className="h-0.5 w-full my-2 bg-slate-300"></span>
					<div className="flex flex-col gap-1 text-white sm:text-base text-sm">
						{signIn_data.data?.map((t) => {
							return (
								<>
									<span>{t[0]}</span>
									<span>{t[1].message}</span>
								</>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	if (signIn_fetched && pb.authStore.model) {
		navigate("/project");
	}
	if (signUp_loading) {
		isSignUpBarActive = true;
	} else isSignUpBarActive = false;
	if (signUp_error) {
		signUpModal = (
			<div className="bg-red-600 h-fit w-full rounded-md border-[1px] px-5 py-3 border-red-800">
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs">
						{/* {newTask_data.message} */}
						salam
					</span>
					<span className="h-0.5 w-full my-2 bg-slate-300"></span>
					<div className="flex flex-col gap-1 text-white sm:text-base text-sm">
						{/* {newTask_data.data?.map((t) => {
							return <span>{t[0]}</span>;
						})} */}
						khodafez
					</div>
				</div>
			</div>
		);
	}
	if (signUp_fetched && pb.authStore.model) {
		navigate("/project");
	}
	return (
		<div className="h-screen w-screen">
			<div className="flex justify-between items-center px-10 py-10">
				<h1 className="text-3xl font-bold">Taska</h1>
				<Button
					variant="contained"
					className="flex items-center justify-center gap-3"
					sx={{ fontFamily: "Poppins", backgroundColor: "slategray" }}
					onClick={() => {
						navigate("/");
					}}
				>
					<ArrowBackIcon fontSize="small" />
					Home
				</Button>
			</div>
			<div className="flex items-center justify-center mt-24">
				<Card className="2xl:w-1/4 xl:w-1/3 md:w-1/2 w-4/5">
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
					<CardContent>
						{/* Sign IN */}
						<CustomTabPanel value={value} index={0}>
							<div className="flex flex-col gap-3 lg:px-10 md:py-5 py-3">
								{signInModal}
								<h1>Email:</h1>
								<TextField
									label="Email"
									variant="outlined"
									className="w-full"
									onChange={(e) => {
										getExistUserData((perv) => {
											return { ...perv, email: e.target.value.toLowerCase() };
										});
									}}
								/>
								<h1>Password:</h1>
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
								<div
									className={isSignInBarActive ? "flex gap-4 items-center" : ""}
								>
									<Button
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !isSignInBarActive ? "100%" : "85%",
										}}
										onClick={() => {
											signIn_refetch();
										}}
									>
										Log In
									</Button>
									{isSignInBarActive && (
										<div className="w-fit flex items-center justify-center mt-3">
											<CircularProgress size={"30px"} />
										</div>
									)}
								</div>
							</div>
						</CustomTabPanel>
						{/* Sign UP */}
						<CustomTabPanel value={value} index={1}>
							<div className="flex flex-col gap-3 lg:px-10 md:py-5 py-3">
								{signUpModal}
								<h1>Email:</h1>
								<TextField
									label="Email"
									type="email"
									variant="outlined"
									className="w-full"
									onChange={(e) => {
										setNewUserData((perv) => {
											return {
												...perv,
												email: e.target.value.toLowerCase(),
												emailVisibility: true,
											};
										});
									}}
								/>
								<h1>Password:</h1>
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
								<h1>Your Name:</h1>
								<TextField
									label="Name"
									variant="outlined"
									onChange={(e) => {
										setNewUserData((perv) => {
											return { ...perv, name: e.target.value };
										});
									}}
								/>
								<div
									className={isSignUpBarActive ? "flex gap-4 items-center" : ""}
								>
									<Button
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !isSignUpBarActive ? "100%" : "85%",
										}}
										onClick={() => {
											signUp_refetch();
										}}
									>
										Create User
									</Button>
									{isSignUpBarActive && (
										<div className="w-fit flex items-center justify-center mt-3">
											<CircularProgress size={"30px"} />
										</div>
									)}
								</div>
							</div>
						</CustomTabPanel>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
