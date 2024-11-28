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
	if (error.code === 400) {
		return {
			code: error.code,
			message: "An Error occurred",
			data: Object.entries(error.data),
		};
	}
}
export function errorSignUp(error) {
	if (error.message === "Failed to create record.") {
		if (error.code === 400) {
			return {
				code: error.code,
				message: "An Error occurred",
				data: Object.entries(error.data).filter((t) => {
					return t[0] !== "passwordConfirm";
				}),
			};
		}
		if (error.code === 403) {
			return {
				code: error.code,
				message: "You don't have permission to do this",
			};
		}
	} else
		return {
			code: error.code,
			data: Object.entries(error.data),
			message: "You Should Fill The Important fields",
		};
}