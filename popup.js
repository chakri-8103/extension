document.addEventListener("DOMContentLoaded", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getLoginData
    }, (results) => {

        let data = results[0].result;

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

// Get localStorage data from site
function getLoginData() {
    return localStorage.getItem("logindata"); // 🔴 change key if needed
}

// Show profile
function showProfile(data) {

    document.getElementById("profile").classList.remove("hidden");

    document.getElementById("name").innerText = data.stdName;
    document.getElementById("suc").innerText = data.stdSuc;
    document.getElementById("section").innerText = data.stdSection;
    document.getElementById("campus").innerText = data.stdCampus;

    if (data.stdPhoto) {
        document.getElementById("photo").src =
            "https://analysis.aditya.ac.in/uploads/student_photos/" + data.stdPhoto;

    }

    document.getElementById("dashboard").onclick = () => {
        chrome.tabs.create({
            url: "https://abhyas.ai/beta/#/student"
        });
    };
}

// Show not login
function showNotLogin() {

    document.getElementById("notLogin").classList.remove("hidden");

    document.getElementById("openSite").onclick = () => {
        chrome.tabs.create({
            url: "https://abhyas.ai"
        });
    };
}