// deno-lint-ignore no-explicit-any
const deleteSameValue = (arr: any[]) => {
	const set = new Set(arr);
	return Array.from(set);
};

export async function findServer() {
	let offset = 1;
	const maxOffset = 901;
	// deno-lint-ignore no-explicit-any
	const servers: any[] = [];

	while (offset < maxOffset) {
		const res = await fetch("https://misskey.io/api/federation/instances?limit=100&offset=" + offset, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await res.json();
		servers.push(...json);
		offset += 100;
	}

	return deleteSameValue(servers);
}
