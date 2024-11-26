document.addEventListener("DOMContentLoaded", () => {
    // Select form and output container
    const form = document.getElementById("madLibForm");
    const outputContainer = document.createElement("div");
    outputContainer.id = "outputContainer";
    form.insertAdjacentElement("afterend", outputContainer);
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting to a server
  
      // Collect input values
      const adjective1 = document.getElementById("adjective1").value;
      const noun = document.getElementById("noun").value;
      const verb1 = document.getElementById("verb1").value;
      const adjective2 = document.getElementById("adjective2").value;
      const pluralNoun = document.getElementById("pluralNoun").value;
  
      // Create the Mad Lib story
      const story = `
        Once upon a time, there was a <strong>${adjective1}</strong> <strong>${noun}</strong> who loved to <strong>${verb1}</strong>.
        Everyone said it was the most <strong>${adjective2}</strong> <strong>${noun}</strong> they had ever seen.
        One day, it found itself surrounded by <strong>${pluralNoun}</strong>, and an adventure began!
      `;
  
      // Display the story dynamically
      outputContainer.innerHTML = `
        <h2>Your Mad Lib Story</h2>
        <p>${story}</p>
        <button id="resetButton">Start Over</button>
      `;
  
      // Reset the form inputs
      form.reset();
  
      // Add event listener to the reset button
      const resetButton = document.getElementById("resetButton");
      resetButton.addEventListener("click", () => {
        outputContainer.innerHTML = ""; // Clear the output container
      });
    });
  });
  
