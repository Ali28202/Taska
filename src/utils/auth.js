import PocketBase from "pocketbase";
const pb = new PocketBase("https://taska.liara.run");

export async function signUp(data) {
	try {
		const record = await pb.collection("users").create(data);
		const authData = await pb
			.collection("users")
			.authWithPassword(data.email, data.password);
		if (!record.code) return record;
		else throw new Error(record);
	} catch (e) {
		console.log(e);
	}
}
export async function signIn(data) {
	try {
		const authData = await pb
			.collection("users")
			.authWithPassword(data.email, data.password);
		if (authData) return authData;
		else throw new Error(authData);
	} catch (e) {
		console.log(e);
	}
}
export { pb };
