document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("openSite").onclick = () => {
        chrome.tabs.create({
            url: "https://abhyas.ai/student",
        });
    };

    chrome.storage.local.get("studentData", (result) => {

        let data = result.studentData;

        if (!data) {
            showNotLogin();
            return;
        }

        try {
            data = JSON.parse(data);

            if (typeof data === "string") {
                data = JSON.parse(data);
            }

        } catch (e) {
            showNotLogin();
            return;
        }

        showProfile(data);
    });

});

// Show profile
function showProfile(data) {

    document.getElementById("notLogin").classList.add("hidden");
    document.getElementById("profile").classList.remove("hidden");

    document.getElementById("name").innerText = data.stdName || "N/A";
    document.getElementById("suc").innerText = data.stdSuc || "N/A";
    document.getElementById("section").innerText = data.stdSection || "N/A";
    document.getElementById("campus").innerText = data.stdCampus || "N/A";

    if (data.stdPhoto) {
        document.getElementById("photo").src =
            "https://analysis.aditya.ac.in/uploads/student_photos/" + data.stdPhoto;
    }

    document.getElementById("letstalk").onclick = () => {
        chrome.windows.create({
            url: "https://abhyas.ai/letstalk/#/student",
            type: "popup",
            state: "fullscreen"
        });
    };

    document.getElementById("analysis").onclick = () => {
        chrome.windows.create({
            url: "https://analysis.aditya.ac.in/v23/student/#/student",
            type: "popup",
            state: "fullscreen"
        });
    };

    document.getElementById("lab").onclick = () => {
        chrome.windows.create({
            url: "https://abhyas.ai/lab/#/student",
            type: "popup",
            state: "fullscreen"
        });
    };

    document.getElementById("abhyas").onclick = () => {
        chrome.windows.create({
            url: "https://abhyas.ai/beta/#/student",
            type: "popup",
            state: "fullscreen"
        });
    };
}

// Show not login
function showNotLogin() {
    document.getElementById("profile").classList.add("hidden");
    document.getElementById("notLogin").classList.remove("hidden");
}