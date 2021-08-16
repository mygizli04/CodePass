import fetch from "node-fetch";

const apiUrl = "https://api.breezecodes.com";
type CheckResponse = "Account" | "Password" | "True" | "KeyError";

export async function check (key: string, username: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let response = await (await fetch(apiUrl + "/checkaccount/" + key + "/" + username + "/" + password)).text() as CheckResponse

        switch (response) {
            case "Account":
                reject("No such account exists.");
                break;
            case "KeyError":
                reject("Invalid API key.");
            case "Password":
                reject("Invalid password.");
                break;
            case "True":
                resolve();
        }

    });
};

type CreateResponse = "Username" | "True" | "KeyError"

export async function create (key: string, username: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let response = await (await fetch(apiUrl + "/createaccount/" + key + "/" + username + "/" + password)).text() as CreateResponse

        switch (response) {
            case "Username":
                reject("Username already in use.");
                break;
            case "KeyError":
                reject("Invalid API key.");
            case "True":
                resolve();
        }

    });
};