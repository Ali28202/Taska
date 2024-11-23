import { pb } from "./auth";
export async function fetchTasks(projTitle) {
	let userEmail = pb.authStore.model.email;
	if (projTitle) {
		const records = await pb.collection("tasks").getFullList({
			filter: `User_email = '${userEmail}' && Proj_title = '${projTitle}'`,
		});
		if (typeof records === "object") return records;
		else throw new Error(records);
	} else throw new Error("no Title found");
}
