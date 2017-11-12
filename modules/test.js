window.onload = function () {
    console.log("started");
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("working");
    });
}