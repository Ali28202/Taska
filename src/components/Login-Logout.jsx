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
import { useMutation } from "@tanstack/react-query";
import { pb, signIn, signUp } from "../utils/auth";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../utils/query";
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
	const { auth } = useParams();
	// getting data from signup page
	const [newUserData, setNewUserData] = useState(null);
	// getting data from signin page
	const [existUserData, getExistUserData] = useState(null);
	const navigate = useNavigate();
	let signInModal;
	let signUpModal;
	useEffect(() => {
		if (pb.authStore.model) {
			navigate("/project");
		}
	}, [pb.authStore]);
	const {
		data: signIn_data,
		mutate: signIn_mutate,
		isSuccess: signIn_success,
		isPending: signIn_pending,
		reset: signIn_reset,
	} = useMutation({
		mutationFn: signIn,
	});
	const {
		data: signUp_data,
		mutate: signUp_mutate,
		isSuccess: signUp_success,
		isPending: signUp_pending,
		reset: signUp_reset,
	} = useMutation({
		mutationFn: signUp,
	});
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		auth === "signin" ? setValue(0) : setValue(1);
	}, [auth]);
	const [showPassword, setShowPassword] = useState(false);
	let signInBar = false;
	let signUpBar = false;
	// sign in
	if (signIn_pending) {
		signInModal = <></>;
		signInBar = (
			<div className="w-fit flex items-center justify-center mt-4">
				<CircularProgress size={"30px"} />
			</div>
		);
	} else signInBar = false;
	if (signIn_data?.code && !signIn_pending) {
		signInModal = (
			<div
				className="bg-red-600 h-fit w-full rounded-md border-[1px] px-5 py-3 border-red-800"
				id="signinError"
			>
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs mt-2">
						{signIn_data.message}
					</span>
					<span className="h-0.5 w-full my-2 bg-slate-300"></span>
					<div className="flex flex-col gap-1 text-white sm:text-base text-sm">
						{signIn_data.data.length ? (
							signIn_data.data?.map((t) => {
								if (t[0] === "identity") {
									return (
										<div
											className="flex lg:items-center items-start  gap-5"
											key={t[0] + t[1].message}
										>
											<span className="font-semibold">email:</span>
											<span className="text-center">{t[1].message}</span>
										</div>
									);
								}
								return (
									<div
										className="flex lg:items-center items-start gap-5"
										key={t[0] + t[1].message}
									>
										<span className="font-semibold">{t[0]}:</span>
										<span className="text-center">{t[1].message}</span>
									</div>
								);
							})
						) : (
							<div>Your Email or Password are incorrect</div>
						)}
					</div>
				</div>
			</div>
		);
	}
	if (signIn_success && pb.authStore.model) {
		queryClient.invalidateQueries({ queryKey: ["projects"] });
		navigate("/project");
	}
	// sign up
	if (signUp_pending) {
		signUpModal = <></>;
		signUpBar = (
			<div className="w-fit flex items-center justify-center mt-4">
				<CircularProgress size={"30px"} />
			</div>
		);
	} else signUpBar = false;
	if (signUp_data?.code && !signUp_pending) {
		signUpModal = (
			<div
				className="bg-red-600 h-fit w-full rounded-md border-[1px] px-5 py-3 border-red-800"
				id="signupError"
			>
				<div className="flex flex-col gap-1">
					<span className="text-white sm:text-base text-sm font-bold">
						Error
					</span>
					<span className="text-white sm:text-base text-xs mt-2">
						{signUp_data.message}
					</span>
					{signUp_data.data.length ? (
						<span className="h-0.5 w-full my-2 bg-slate-300"></span>
					) : (
						<></>
					)}
					<div className="flex flex-col gap-1 text-white sm:text-base text-sm">
						{signUp_data.data.length ? (
							signUp_data.data?.map((t) => {
								return (
									<div
										className="flex lg:items-center items-start gap-5"
										key={t[0] + t[1].message}
									>
										<span className="font-semibold">{t[0]}:</span>
										<span className="text-center">{t[1].message}</span>
									</div>
								);
							})
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		);
	}
	if (signUp_success && pb.authStore.model) {
		queryClient.invalidateQueries({ queryKey: ["projects"] });
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
			<div className="flex items-center justify-center py-5">
				<Card className="2xl:w-1/3 xl:w-2/5 md:w-1/2 w-4/5">
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
							onClick={() => {
								navigate("/signin");
								signUp_reset();
							}}
						/>
						<Tab
							label="Sign Up"
							{...allyProps(1)}
							sx={{ fontFamily: "Poppins" }}
							onClick={() => {
								navigate("/signup");
								signIn_reset();
							}}
						/>
					</Tabs>
					<CardContent>
						{/* Sign IN */}
						<CustomTabPanel value={value} index={0}>
							<div className="flex flex-col gap-3 lg:px-5 md:py-5 py-3">
								{signInModal}
								<h1>Email:</h1>
								<TextField
									id="signinEmail"
									label="Email*"
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
										Password*
									</InputLabel>
									<OutlinedInput
										id="signinPassword"
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
									className={
										signInBar ? "flex items-center justify-between lg:pr-5" : ""
									}
								>
									<Button
										id="submitSignin"
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !signInBar ? "100%" : "85%",
										}}
										onClick={() => {
											signIn_mutate(existUserData || "");
										}}
									>
										Log In
									</Button>
									{signInBar}
								</div>
							</div>
						</CustomTabPanel>
						{/* Sign UP */}
						<CustomTabPanel value={value} index={1}>
							<div className="flex flex-col gap-3 lg:px-5 md:py-5 py-3">
								{signUpModal}
								<h1>Email:</h1>
								<TextField
									id="signupEmail"
									label="Email*"
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
										Password*
									</InputLabel>
									<OutlinedInput
										id="signupPassword"
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
									id="signupName"
									label="Name*"
									variant="outlined"
									onChange={(e) => {
										setNewUserData((perv) => {
											return { ...perv, name: e.target.value };
										});
									}}
								/>
								<div
									className={
										signUpBar ? "flex items-center justify-between lg:pr-5" : ""
									}
								>
									<Button
										id="submitSignup"
										variant="contained"
										sx={{
											fontFamily: "Poppins",
											textTransform: "none",
											marginTop: 2,
											width: !signUpBar ? "100%" : "85%",
										}}
										onClick={() => {
											signUp_mutate(newUserData || "");
										}}
									>
										Create User
									</Button>
									{signUpBar}
								</div>
							</div>
						</CustomTabPanel>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
