import { pb } from "./auth";
import { errorPatchProj, errorPostProj } from "./error";
export async function fetchProjects() {
	let userEmail = pb.authStore.model.email;
	const records = await pb.collection("projects").getFullList({
		filter: `User_email = '${userEmail}'`,
	});
	if (!records.code) return records;
	else throw new Error(records);
}
export async function postProject(newProject) {
	try {
		const record = await pb.collection("projects").create(newProject);
		return record;
	} catch (e) {
		return errorPostProj(e.data);
	}
}
export async function updateProject(record_id, updatedProject) {
	try {
		const record = await pb
			.collection("projects")
			.update(record_id, updatedProject);
		return record;
	} catch (e) {
		return errorPatchProj(e);
	}
}
