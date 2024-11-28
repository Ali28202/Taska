import { pb } from "./auth";
import { errorPostTask } from "./error";
export async function fetchTasks(projTitle) {
	let userEmail = pb.authStore.model.email;
	const records = await pb.collection("tasks").getFullList({
		filter: `User_email = '${userEmail}' && Proj_title = '${projTitle}'`,
	});
	return records;
}
export async function searchTask(title) {
	let userEmail = pb.authStore.model.email;
	const records = await pb.collection("tasks").getFullList({
		filter: `User_email = '${userEmail}' && title ~ '${title}'`,
	});
	return records;
}
export async function postTask(data) {
	try {
		const record = await pb.collection("tasks").create(data);
		if (!record.code) return record;
	} catch (e) {
		return errorPostTask(e.data);
	}
}
export async function deleteTask(record_id) {
	const record = await pb.collection("tasks").delete(record_id);
	return record;
}
export async function updateTask(record_id, updatedTask) {
	const record = await pb.collection("tasks").update(record_id, updatedTask);
	return record;
}
