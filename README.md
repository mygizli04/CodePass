# CodePass
Javascript module for [CodePass](https://api.breezecodes.com/)

# Usage
This module requires [node-fetch](https://www.npmjs.com/package/node-fetch). If you are going to use it in your own project, please install it with <code>npm i node-fetch</code>

# API Keys
How to get API keys is detailed on [the CodePass website](https://api.breezecodes.com/).

# Documentation
Documentation is available at [my website](https://sbeve.me/CodePass/docs/)

# Example

This module is built with typescript, so it comes with .d.ts files! But here's a javascript example showing all possible errors/uses.
```javascript
// Import codepass
const codepass = require('./codepass.js')

// Create account
// Note: All methods in this lib are async functions
codepass.create("YOUR-API-KEY", "USERNAME", "PASSWORD").then(() => {
    console.log("Created account!")
}).catch(err => {
    // Uh oh, account creation failed! Let's see why...

    switch (err) {
        case "Username already in use.":
            console.error("Sorry, the username you have chosen is already in use. Please try again.");
            break;
        case "Invalid API key.":
            console.error("Uh oh, my developer has to fix my API key!");
            break;
        default:
            console.error("Oh no, some internal error! Do you have an internet connection?");
            break;
    }

    process.exit(1);
})

// Check account
codepass.check("YOUR-API-KEY", "USERNAME", "PASSWORD").then(result => {
    // result === [true/false, CheckResult] (see https://sbeve.me/CodePass/docs/modules.html#CheckResult)

    if (result[0]) {
        console.log("Success!");
    }
    else {
        console.error("Failure because of " + result[1]);
    }
}).catch(err => {
    // Oops! An error occured! Your API token is probably incorrect.
    if (err === "Invalid API key.") {
        console.error("Oops. Please ask my dev to fix me.");
        process.exit(1);
    }
    else {
        // If you're here it's an internal error. Check your internet connection!
        console.error("Uh oh, it appears there are some internal errors that I cannot fix!");
        process.exit(1);
    }

});
```

