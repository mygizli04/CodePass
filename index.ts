import fetch from "node-fetch"; // Used for contacting the API

const apiUrl = "https://api.breezecodes.com"; // The API's base URL

/**
 * Possible values a username/pass check can return
 */
type CheckResponse = "Account" | "Password" | "True" | "KeyError";

/**
 * The results of a username/password check.
 */
export type CheckResult = "InvalidAccount" | "WrongPassword" | null;

/**
 * Check if a username/password combination is correct.
 * 
 * @async
 * @param  {string} key The API key to be used. Details available on {@link https://api.breezecodes.com/ API page}
 * @param  {string} username Username to be checked.
 * @param  {string} password Password to be checked.
 * @returns [boolean, {@link CheckResult}]
 */
export async function check (key: string, username: string, password: string): Promise<[boolean, CheckResult]> {
    return new Promise(async (resolve, reject) => {
        let response = await (await fetch(apiUrl + "/checkaccount/" + key + "/" + username + "/" + password)).text() as CheckResponse;

        switch (response) {
            case "Account":
                resolve([false, "InvalidAccount"]);
                break;
            case "KeyError":
                reject("Invalid API key.");
            case "Password":
                resolve([false, "WrongPassword"]);
                break;
            case "True":
                resolve([true, null]);
        }

    });
};

/**
 * Possible responses of a create call.
 */
type CreateResponse = "Username" | "True" | "KeyError";

// On errors we just reject the promise, so no "CreateResult" or anything.

/**
 * Creates an account
 * 
 * @async
 * @param  {string} key The API key to be used. Details available on {@link https://api.breezecodes.com/ API page}.
 * @param  {string} username The username to create.
 * @param  {string} password The password to create.
 * @returns {void}
 */
export async function create (key: string, username: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let response = await (await fetch(apiUrl + "/createaccount/" + key + "/" + username + "/" + password)).text() as CreateResponse;

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