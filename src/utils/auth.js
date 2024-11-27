import PocketBase from "pocketbase";
import { errorSignIn } from "./error";
const pb = new PocketBase("https://taska.liara.run");
export async function signUp(data) {
	try {
		const record = await pb.collection("users").create(data);
		const authData = await pb
			.collection("users")
			.authWithPassword(data.email, data.password);
		return authData;
	} catch (e) {
		// return errorSignIn(e.data);
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
