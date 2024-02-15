export async function isNoCapNoMail(host: string, softwareType: string) {
  if (softwareType !== "misskey") {
    return false;
  }

  const endpoint = `https://${host}/api/meta`;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    if (json["emailRequiredForSignup"]) {
      return false;
    }

    if (
      json["enableHcaptcha"] ||
      json["enableMcaptcha"] ||
      json["enableRecaptcha"]
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
