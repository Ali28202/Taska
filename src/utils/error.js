export function errorPostTask(error) {
	if (error.code === 400) {
		return {
			code: error.code,
			message: "You must fill in the following:",
			data: Object.entries(error.data),
		};
	}
	if (error.code === 403) {
		return {
			code: error.code,
			message: "You don't have permission to do this",
		};
	}
}
export function errorSignIn(error) {
	let data = Object.entries(error.data);
	const idx = data.findIndex("identity");
	data[idx] = "Email";
	console.log(data);
	if (error.code === 400) {
		return {
			code: error.code,
			message: "An Error occurred.:",
			data: data,
		};
	}
}
