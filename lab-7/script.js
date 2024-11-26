document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("madLibForm");
    const outputSection = document.getElementById("outputSection");
    const storyElement = document.getElementById("madLibStory");
    const resetButton = document.getElementById("resetForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Fetch form data
        const adjective1 = document.getElementById("adjective1").value;
        const noun = document.getElementById("noun").value;
        const verb1 = document.getElementById("verb1").value;
        const adjective2 = document.getElementById("adjective2").value;
        const pluralNoun = document.getElementById("pluralNoun").value;

        // Generate the Mad Lib story
        const madLib = `One day, a ${adjective1} ${noun} decided to ${verb1}. 
                        It met a ${adjective2} group of ${pluralNoun}, and they ${verb1} happily ever after.`;

        // Display the story
        storyElement.textContent = madLib;
        form.style.display = "none";
        outputSection.style.display = "block";
    });

    resetButton.addEventListener("click", () => {
        // Reset form and display
        form.reset();
        form.style.display = "block";
        outputSection.style.display = "none";
    });

    // Display last modified date
    document.getElementById("lastModified").textContent = document.lastModified;
});
