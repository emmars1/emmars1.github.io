document.addEventListener("DOMContentLoaded", function() {

    const checkbox = document.getElementById("checkbox")
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark")
    })

    const accordionBtns = document.querySelectorAll(".accordion");
    accordionBtns.forEach((accordion) => {
        accordion.onclick = function () {
            this.classList.toggle("is-open");

            let content = this.nextElementSibling;
            console.log(content);

            if (content.style.maxHeight) {
                /*this is for when the accordion is open*/
                content.style.maxHeight = null;
            } else {
                /*this is for when the accordion is closed/default*/
                content.style.maxHeight = content.scrollHeight + "px";
                console.log(content.style.maxHeight);
            }
        };
    });

});
