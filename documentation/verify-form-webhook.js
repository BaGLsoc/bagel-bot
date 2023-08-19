/**
 * Script to be run through google app scripts on the google console
 */

// TODO: CHANGE URL TO ADMIN ONLY CHAT
const POST_URL = "";

function onSubmit(e) {
    Utilities.sleep(3000);

    const response = e.response.getItemResponses();
    let items = [];
    let email = "";
    let name = "";
    let tag = "";

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = [];

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (question == "Email") {
                email = part;
            }

            if (question == "Full Name") {
                name = part;
            }

            if (question == "Discord Tag (Username and # with 4 numbers)") {
                tag = part;
            }
        }
    }

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        payload: JSON.stringify({
            content: email + ":" + name + ":" + tag,
        }),
    };

    UrlFetchApp.fetch(POST_URL, options);
}

