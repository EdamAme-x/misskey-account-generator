export function existDir(dir: string): boolean {
	try {
		return Deno.statSync(dir).isDirectory;
	} catch {
		return false;
	}
}
