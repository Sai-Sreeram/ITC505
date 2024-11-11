// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

// Story Data with all 15 stages, each with an associated image
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
        image: "assets/1.jpeg"
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
        image: "assets/2.jpeg"
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
        image: "assets/3.jpeg"
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
        image: "assets/4.jpeg"
    },
    aiHub: {
        text: "You arrive at the AI Hub and find clues that lead to the AI's last known location.",
        choices: ["Investigate Deep Storage", "Check Maintenance Logs"],
        consequence: ["deepStorage", "maintenanceLogs"],
        image: "assets/5.jpeg"
    },
    deepStorage: {
        text: "You find the AI’s backup core! But there’s a security breach.",
        choices: ["Attempt to Secure Backup", "Report to HQ"],
        consequence: ["secureBackup", "reportHQ"],
        image: "assets/6.jpeg"
    },
    maintenanceLogs: {
        text: "The maintenance logs reveal an unauthorized access point.",
        choices: ["Trace the Access Point", "Ignore and Investigate Further"],
        consequence: ["traceAccess", "investigateFurther"],
        image: "assets/7.jpeg"
    },
    traceAccess: {
        text: "Tracing the access point reveals a shadowy figure tampering with the AI core!",
        choices: ["Confront the Figure", "Hide and Observe"],
        consequence: ["confrontFigure", "observeFigure"],
        image: "assets/8.jpeg"
    },
    investigateFurther: {
        text: "You ignore the access point and explore more, but the AI system is shut down completely.",
        choices: ["Restart System", "Leave City"],
        consequence: ["systemRestart", "leaveCity"],
        image: "assets/9.jpeg"
    },
    secureBackup: {
        text: "You successfully secured the backup core! The AI will be safe for now.",
        choices: [],
        consequence: [],
        image: "assets/10.jpeg"
    },
    reportHQ: {
        text: "You report to HQ, but the AI’s backup core is compromised. The city is at risk!",
        choices: [],
        consequence: [],
        image: "assets/11.jpeg"
    },
    confrontFigure: {
        text: "You confront the figure, but they escape, leaving the AI in a critical state.",
        choices: [],
        consequence: [],
        image: "assets/12.jpeg"
    },
    observeFigure: {
        text: "You observe quietly as the figure leaves, allowing you to restore the AI without alerting them.",
        choices: [],
        consequence: [],
        image: "assets/13.jpeg"
    },
    systemRestart: {
        text: "You restart the system successfully, bringing the AI back online. Mission accomplished!",
        choices: [],
        consequence: [],
        image: "assets/14.jpeg"
    },
    leaveCity: {
        text: "You decide to leave the city, abandoning the mission. The AI remains missing.",
        choices: [],
        consequence: [],
        image: "assets/15.jpeg"
    }
};

// Initialize Audio Elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");
let musicPlayed = false; // Flag to track if music has started

// Start the game
const startGame = () => {
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

    // Display Restart Button if no choices are available (end stage)
    if (stage.choices.length === 0) {
        document.getElementById("restartButton").style.display = "block";
        document.querySelector('.blur-overlay').style.display = "block"; // Show blur overlay at end
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

// Attach event listener for music toggle
document.getElementById("toggleMusic").onclick = toggleMusic;

// Function to handle navigation buttons under City Map
const exploreArea = (areaKey) => {
    console.log(`Exploring area: ${areaKey}`);
    updatePage(areaKey);
};

// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);
