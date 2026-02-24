function syncLoginData() {

    let data = localStorage.getItem("logindata");

    if (data) {
        chrome.storage.local.set({ studentData: data });
    } else {
        chrome.storage.local.remove("studentData");
    }
}

// Run continuously (Angular apps need this)
setInterval(syncLoginData, 2000);