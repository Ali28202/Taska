import PocketBase from "pocketbase";
const pb = new PocketBase("https://taska.liara.run");

export async function signUp(data) {
	const record = await pb.collection("users").create(data);
	const authData = await pb
		.collection("users")
		.authWithPassword(data.email, data.password);
	if (typeof record === "object") return record;
	else throw new Error(record);
}
export async function signIn(data) {
	const authData = await pb
		.collection("users")
		.authWithPassword(data.email, data.password);
	if (authData) return authData;
	else throw new Error(authData);
}
export { pb };
