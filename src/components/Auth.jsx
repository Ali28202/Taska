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
export default function Auth({ isLogged }) {
	const [openDialog, setOpenDialog] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			{isLogged ? (
				<div className="flex items-center xl:gap-4 lg:gap-6">
					<Avatar sx={{ width: 32, height: 32, bgcolor: "blueviolet" }}>
						A
					</Avatar>
					<h1 className="xl:text-lg text-base">Ali Mahallati</h1>
					<IconButton color="error" className="xl:!p-3 lg:!p-2">
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
						Login / SignUp
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
								label="Log in"
								{...allyProps(0)}
								sx={{ fontFamily: "Poppins" }}
							/>
							<Tab
								label="Sign Up"
								{...allyProps(1)}
								sx={{ fontFamily: "Poppins" }}
							/>
						</Tabs>
						<CustomTabPanel value={value} index={0}>
							<div className="flex flex-col gap-5 md:px-10 px-3 md:py-5 py-3">
								<label htmlFor="Email">Email:</label>
								<TextField
									label="Email"
									variant="outlined"
									className="md:w-72 w-full"
								/>
								<label htmlFor="Password">Password:</label>
								<TextField label="Password" variant="outlined" />
								<Button
									variant="contained"
									sx={{ fontFamily: "Poppins", textTransform: "none" }}
								>
									Submit
								</Button>
							</div>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<div className="flex flex-col gap-5 md:px-10 px-3 md:py-5 py-3">
								<label htmlFor="Email">Email:</label>
								<TextField
									label="Email"
									variant="outlined"
									className="md:w-72 w-64"
								/>
								<label htmlFor="Password">Password:</label>
								<TextField label="Password" variant="outlined" />
								<label htmlFor="Name">Name:</label>
								<TextField label="Name" variant="outlined" />
								<Button
									variant="contained"
									sx={{ fontFamily: "Poppins", textTransform: "none" }}
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
