import { pb } from "./auth";
export async function fetchProjects() {
	let userEmail = pb.authStore.model.email;
	const records = await pb.collection("projects").getFullList({
		filter: `User_email = '${userEmail}'`,
	});
	if (typeof records === "object") return records;
	else throw new Error(records);
}
export async function postProject(newProject) {
	const record = await pb.collection("projects").create(newProject);
	if (typeof record === "object") return record;
	else throw new Error(record);
}
export async function updateProject(record_id, updatedProject) {
	const record = await pb
		.collection("projects")
		.update(record_id, updatedProject);
	if (typeof record === "object") return record;
	else throw new Error(record);
}
