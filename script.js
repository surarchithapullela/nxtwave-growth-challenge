let registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];


/* UPDATE REGISTRATION COUNT */

function updateCount() {

    document.getElementById("registrationCount")
        .innerText = registrations.length;

}

updateCount();


/* SCROLL TO REGISTRATION */

function scrollToRegister() {

    document.getElementById("register")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* GENERATE REFERRAL CODE */

function generateReferralCode(name) {

    let cleanName =
        name.replace(/\s/g, "")
            .substring(0, 4)
            .toUpperCase();

    let number =
        Math.floor(100 + Math.random() * 900);

    return cleanName + number;

}


/* REGISTRATION */

document
    .getElementById("registrationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let name =
            document.getElementById("name").value;

        let email =
            document.getElementById("email").value;

        let college =
            document.getElementById("college").value;

        let source =
            document.getElementById("source").value;

        let referral =
            document.getElementById("referral").value;


        let referralCode =
            generateReferralCode(name);


        let registration = {

            name: name,

            email: email,

            college: college,

            source: source,

            referralUsed: referral,

            referralCode: referralCode

        };


        registrations.push(registration);


        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        document.getElementById(
            "successMessage"
        ).innerHTML =

        `
        <p>
        Registration successful!
        </p>

        <p>
        Your referral code is:
        <strong>${referralCode}</strong>
        </p>
        `;


        document.getElementById(
            "referralCode"
        ).innerText = referralCode;


        updateCount();


        document
            .getElementById("registrationForm")
            .reset();

    });


/* SHARE REFERRAL */

function shareReferral() {

    let code =
        document.getElementById(
            "referralCode"
        ).innerText;


    if (code === "Register first") {

        alert(
            "Please register first."
        );

        return;

    }


    let message =

        `I just registered for the
"Build Your First AI Project in 60 Minutes"
workshop.

You should join too!

Use my referral code:
${code}

Register here:
YOUR_WEBSITE_LINK`;


    if (navigator.share) {

        navigator.share({

            title:
                "Build Your First AI Project",

            text: message

        });

    } else {

        navigator.clipboard
            .writeText(message);

        alert(
            "Referral message copied!"
        );

    }

}