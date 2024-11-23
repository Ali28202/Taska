import { pb } from "./auth";
export async function fetchTasks(projTitle) {
	let userEmail = pb.authStore.model.email;
	try {
		const records = await pb.collection("tasks").getFullList({
			filter: `User_email = '${userEmail}' && Proj_title = '${projTitle}'`,
		});
		if (!records.code) return records;
		else throw new Error(records);
	} catch (e) {
		console.log(e);
	}
}
export async function postTask(data) {
	try {
		const record = await pb.collection("tasks").create(data);
		if (!record.code) return record;
		else throw new Error(record);
	} catch (e) {
		console.log(e);
	}
}
export async function deleteTask(record_id) {
	try {
		const record = await pb.collection("tasks").delete(record_id);
		if (!record.code) return record;
		else throw new Error(record);
	} catch (e) {
		console.log(e);
	}
}
export async function updateTask(record_id, updatedTask) {
	try {
		const record = await pb.collection("tasks").update(record_id, updatedTask);
		if (!record.code) return record;
		else throw new Error(record);
	} catch (e) {
		console.log(e);
	}
}
