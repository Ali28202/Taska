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
	console.log(error);
	if (error.code === 400) {
		return {
			code: error.code,
			message: "An Error occurred",
			data: Object.entries(error.data),
		};
	}
}
