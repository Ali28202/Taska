import { pb } from "./auth";
export async function fetchProjects() {
	let userEmail = pb.authStore.model.email;
	const records = await pb.collection("projects").getFullList({
		filter: `User_email = '${userEmail}'`,
	});
	if (typeof records === "object") return records;
	else throw new Error(records);
}
