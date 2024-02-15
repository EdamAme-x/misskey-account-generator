import { existDir } from "./utils/existDir.ts";
import { findServer } from "./findServer/index.ts";
import { isNoCapNoMail } from "./noCapNoMail/index.ts";

const saveFileName = "msky-account." + Date.now().toString(36) + ".json";
const saveDir = "result";

const saveFilePath = saveDir + "/" + saveFileName;

if (!existDir(saveDir)) {
	Deno.mkdirSync(saveDir);
}
Deno.writeTextFileSync(saveFilePath, JSON.stringify([]));

const servers = await findServer();
console.log(servers.length);

for (const server of servers) {
	const noCapNoMail = await isNoCapNoMail(server["host"], server["softwareName"]);
	if (noCapNoMail) {
		console.log(server["host"]);
	}
}
