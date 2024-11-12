// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

let restartTimer; // Variable to store the restart timer

// Story Data with all stages, images, and unique addendum content
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
        image: "assets/1.jpeg",
        addendum: "In the beginning, you are tasked with finding the missing AI that controls vital city functions. Choose your actions wisely, as every choice will lead to a different part of the story with unique challenges and opportunities."
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
        image: "assets/2.jpeg",
        addendum: "In the surveillance room, you notice encrypted logs. This is an opportunity to test your decryption skills and gain valuable insights."
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
        image: "assets/3.jpeg",
        addendum: "In the data center, you found a hidden file that may contain the AI’s last known location. Analyzing this file could reveal crucial information."
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
        image: "assets/4.jpeg",
        addendum: "In the tech lab, the suspect provides some subtle clues. Following these leads might bring you closer to solving the mystery."
    },
    aiHub: {
        text: "You arrive at the AI Hub and find clues that lead to the AI's last known location.",
        choices: ["Investigate Deep Storage", "Check Maintenance Logs"],
        consequence: ["deepStorage", "maintenanceLogs"],
        image: "assets/5.jpeg",
        addendum: "At the AI Hub, you uncover critical clues pointing to the AI's last known location. Choose your next move wisely."
    },
    deepStorage: {
        text: "You find the AI’s backup core! But there’s a security breach.",
        choices: ["Attempt to Secure Backup", "Report to HQ"],
        consequence: ["secureBackup", "reportHQ"],
        image: "assets/6.jpeg",
        addendum: "You’ve located the AI’s backup core, but it’s vulnerable to a security breach. Securing it could save the mission."
    },
    maintenanceLogs: {
        text: "The maintenance logs reveal an unauthorized access point.",
        choices: ["Trace the Access Point", "Ignore and Investigate Further"],
        consequence: ["traceAccess", "investigateFurther"],
        image: "assets/7.jpeg",
        addendum: "Maintenance logs indicate unauthorized access. Tracing it could reveal the culprit's identity."
    },
    traceAccess: {
        text: "Tracing the access point reveals a shadowy figure tampering with the AI core!",
        choices: ["Confront the Figure", "Hide and Observe"],
        consequence: ["confrontFigure", "observeFigure"],
        image: "assets/8.jpeg",
        addendum: "You’ve traced the access point to a shadowy figure. Confronting them could be risky, but it might also provide the answers you need."
    },
    investigateFurther: {
        text: "You ignore the access point and explore more, but the AI system is shut down completely.",
        choices: ["Restart System", "Leave City"],
        consequence: ["systemRestart", "leaveCity"],
        image: "assets/9.jpeg",
        addendum: "You decided to investigate further, but now the AI system is entirely shut down. Restarting it might be your only chance."
    },
    secureBackup: {
        text: "You successfully secured the backup core! The AI will be safe for now.",
        choices: [],
        consequence: [],
        image: "assets/10.jpeg",
        addendum: "You successfully secured the AI’s backup core, ensuring its safety for now. Mission accomplished!"
    },
    reportHQ: {
        text: "You report to HQ, but the AI’s backup core is compromised. The city is at risk!",
        choices: [],
        consequence: [],
        image: "assets/11.jpeg",
        addendum: "You reported the findings to HQ, but the AI’s core is already compromised. The city remains in danger."
    },
    confrontFigure: {
        text: "You confront the figure, but they escape, leaving the AI in a critical state.",
        choices: [],
        consequence: [],
        image: "assets/12.jpeg",
        addendum: "Attempting to confront the mysterious figure didn’t work out, and they managed to escape, leaving the AI vulnerable."
    },
    observeFigure: {
        text: "You observe quietly as the figure leaves, allowing you to restore the AI without alerting them.",
        choices: [],
        consequence: [],
        image: "assets/13.jpeg",
        addendum: "You chose to stay hidden, and as a result, you were able to restore the AI without alerting the intruder."
    },
    systemRestart: {
        text: "You restart the system successfully, bringing the AI back online. Mission accomplished!",
        choices: [],
        consequence: [],
        image: "assets/14.jpeg",
        addendum: "You successfully restarted the AI system, bringing it back online and completing your mission."
    },
    leaveCity: {
        text: "You decide to leave the city, abandoning the mission. The AI remains missing.",
        choices: [],
        consequence: [],
        image: "assets/15.jpeg",
        addendum: "You decided to leave the city, abandoning your mission and leaving the AI’s fate uncertain."
    }
};

// Initialize Audio Elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");

// Set initial state of the toggle music button and start with music on
backgroundMusic.volume = 0.3;
backgroundMusic.play().then(() => {
    document.getElementById("toggleMusic").textContent = "🔇 Music Off";
}).catch(error => {
    console.error("Background music failed to play initially:", error);
    document.getElementById("toggleMusic").textContent = "🔊 Music On";
});

// Start the game
const startGame = () => {
    clearTimeout(restartTimer); // Clear any previous timer
    document.getElementById("restartButton").style.display = "none"; // Hide restart button on start
    document.querySelector('.blur-overlay').style.display = "none"; // Hide blur overlay
    updatePage("start");
};

// Function to update the page content based on the story stage
const updatePage = (stageKey) => {
    console.log(`Updating page for stage: ${stageKey}`);

    // Handle mini-games
    if (stageKey === "decryptPuzzle") {
        decryptPuzzle();
        return;
    } else if (stageKey === "dataAnalysis") {
        dataAnalysis();
        return;
    }

    // Get the stage data from the story object
    const stage = story[stageKey];
    if (!stage) return;

    document.getElementById("storyText").innerText = stage.text;
    const storyImage = document.getElementById("storyImage");
    storyImage.src = stage.image;
    storyImage.alt = `Image for ${stageKey}`;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    // Update addendum content dynamically
    document.getElementById("addendumContent").innerText = stage.addendum;

    // Display Restart Button after 5 seconds if no choices are available (end stage)
    if (stage.choices.length === 0) {
        document.querySelector('.blur-overlay').style.display = "none"; // Hide blur overlay initially
        restartTimer = setTimeout(() => {
            document.getElementById("restartButton").style.display = "block";
            document.querySelector('.blur-overlay').style.display = "block"; // Show blur overlay after 5 seconds
        }, 5000); // 5-second delay before showing the restart button
    } else {
        document.getElementById("restartButton").style.display = "none";
        document.querySelector('.blur-overlay').style.display = "none"; // Hide blur overlay during gameplay
    }

    // Add choice buttons for non-ending stages
    stage.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;

        button.onclick = () => {
            playClickSound();
            updatePage(stage.consequence[index]);
        };

        choicesContainer.appendChild(button);
    });
};

// Function to play click sound
const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
};

// Toggle Background Music
const toggleMusic = () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            document.getElementById("toggleMusic").textContent = "🔇 Music Off";
        }).catch(error => {
            console.error("Background music failed to play:", error);
        });
    } else {
        backgroundMusic.pause();
        document.getElementById("toggleMusic").textContent = "🔊 Music On";
    }
};

// Attach event listener for music toggle
document.getElementById("toggleMusic").onclick = toggleMusic;

// Mini-game: Simple decryption challenge
const decryptPuzzle = () => {
    console.log("decryptPuzzle mini-game started");
    const attempt = prompt("Enter decryption key (Hint: 1337):");
    if (attempt === "1337") {
        alert("Decryption successful! You found a lead.");
        updatePage("dataCenter"); // Move to next stage
    } else {
        alert("Decryption failed. Try again.");
    }
};

// Mini-game: Data analysis challenge
const dataAnalysis = () => {
    console.log("dataAnalysis mini-game started");
    const data = prompt("Analyze data pattern (Enter 1234 for success):");
    if (data === "1234") {
        alert("Analysis successful! This data points to the AI’s possible location.");
        updatePage("aiHub");
    } else {
        alert("Analysis inconclusive. Try again.");
    }
};

// Addendum Modal Toggle
const toggleAddendum = () => {
    const addendumModal = document.getElementById("addendumModal");
    addendumModal.style.display = addendumModal.style.display === "flex" ? "none" : "flex";
};

// Technical Addendum Content
const technicalAddendumContent = `
    <p>This development was accompanied by deliberate technical choices, which created an interactive and visually interesting experience while keeping the framework clean and responsive.</p>
    <p>My strategy in building the structure of HTML aimed at using semantic tags with the purpose of achieving maximum accessibility along with a smooth and consistent flow. Section tags were used in separating the story container, city map, modal elements, for clarity, as well as better navigation. Button, div, and img tags are used to maintain a layout. These aided together efficiently in the content organization and good functional elements.</p>
    <p>CSS helped me structure a uniform look and feel. In working on the colors, I used color variables to keep the color theme uniform throughout the site. This makes styling adjustments easier later on. I also used animations and button transitions to add in a certain responsiveness, creating user engagement as well-to give feedback at each turn.</p>
    <p>To emphasize the restart button located at the conclusion of each story, an overlay blur effect was employed. This technique effectively directs the user's attention to the restart option while minimizing visual distractions on the screen. Furthermore, media queries were utilized to ensure that the layout adjusts seamlessly across various device dimensions, a consideration that was prioritized to enhance accessibility and facilitate a fluid user experience.</p>
    <p>Much utilization of JavaScript went into the control of the branching paths, the choices by the user, and interactivity. I structured each step of the story as an object, where the content was text, choices, consequences, images, and addendum content in modular terms, thus being easy to add or remove or alter as needed. Functions were mainly managed in terms of event listeners, with these performing dynamic updates on the page based on the choices of the user, making it ideal for the game in terms of immersion.</p>
    <p>The challenge that I faced was to take care of smooth transitions between the stages without allowing the dynamic update of the modals from breaking the flow. Debugging these issues requires close attention to event listeners and proper state management but will, in the end, enhance project functionality and user experience.</p>
`;

// Function to toggle Technical Addendum modal
const toggleTechnicalAddendum = () => {
    const technicalAddendumModal = document.getElementById("technicalAddendumModal");
    const technicalAddendumContentElement = document.getElementById("technicalAddendumContent");
    technicalAddendumContentElement.innerHTML = technicalAddendumContent;
    technicalAddendumModal.style.display = technicalAddendumModal.style.display === "flex" ? "none" : "flex";
};

// Show Technical Addendum modal on page load
window.onload = () => {
    toggleTechnicalAddendum();
};

// Close modal when clicking outside the content area
window.onclick = (event) => {
    const addendumModal = document.getElementById("addendumModal");
    const technicalAddendumModal = document.getElementById("technicalAddendumModal");
    if (event.target === addendumModal) {
        addendumModal.style.display = "none";
    }
    if (event.target === technicalAddendumModal) {
        technicalAddendumModal.style.display = "none";
    }
};

// Function to handle navigation buttons under City Map
const exploreArea = (areaKey) => {
    console.log(`Exploring area: ${areaKey}`);
    updatePage(areaKey);
};

// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);
