import PocketBase from "pocketbase";
import { errorSignIn, errorSignUp } from "./error";
const isCypress = window.Cypress;
const pb = new PocketBase(
	isCypress
		? process.env.REACT_APP_POCKETBASE_TEST_URL
		: process.env.REACT_APP_POCKETBASE_PROD_URL
);

export async function signUp(data) {
	try {
		const record = await pb.collection("users").create(data);
		if (!record.code) {
			const authData = await pb
				.collection("users")
				.authWithPassword(data.email, data.password);
			return authData;
		}
		return record;
	} catch (e) {
		return errorSignUp(e.data);
	}
}
export async function signIn(data) {
	try {
		const authData = await pb
			.collection("users")
			.authWithPassword(data.email, data.password);
		return authData;
	} catch (e) {
		return errorSignIn(e.data);
	}
}
export { pb };
