// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

let restartTimer; // Variable to store the restart timer

// Story Data with all stages and unique addendum content for each stage
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
let musicPlayed = false; // Flag to track if music has started

// Set initial state of toggle music button
document.getElementById("toggleMusic").textContent = backgroundMusic.paused ? "🔊 Music On" : "🔇 Music Off";

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
            if (!musicPlayed) {
                startBackgroundMusic();
                musicPlayed = true;
            }
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

// Function to start background music after the first interaction
const startBackgroundMusic = () => {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play().catch(error => {
        console.error("Background music failed to play:", error);
    });
};

// Toggle Background Music
const toggleMusic = () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.getElementById("toggleMusic").textContent = "🔇 Music Off";
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

// Close modal when clicking outside the content area
window.onclick = (event) => {
    const modal = document.getElementById("addendumModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Function to handle navigation buttons under City Map
const exploreArea = (areaKey) => {
    console.log(`Exploring area: ${areaKey}`);
    updatePage(areaKey);
};

// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);
