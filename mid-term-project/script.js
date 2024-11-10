// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

// Story Data with 8 different endings, each with an associated image
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
        image: "images/start.jpg"
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
        image: "images/surveillance.jpg"
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
        image: "images/datacenter.jpg"
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
        image: "images/techlab.jpg"
    },
    aiHub: {
        text: "You arrive at the AI Hub and find clues that lead to the AI's last known location.",
        choices: ["Investigate Deep Storage", "Check Maintenance Logs"],
        consequence: ["deepStorage", "maintenanceLogs"],
        image: "images/aihub.jpg"
    },
    deepStorage: {
        text: "You find the AI’s backup core! But there’s a security breach.",
        choices: ["Attempt to Secure Backup", "Report to HQ"],
        consequence: ["secureBackup", "reportHQ"],
        image: "images/deepstorage.jpg"
    },
    maintenanceLogs: {
        text: "The maintenance logs reveal an unauthorized access point.",
        choices: ["Trace the Access Point", "Ignore and Investigate Further"],
        consequence: ["traceAccess", "investigateFurther"],
        image: "images/maintenance.jpg"
    },
    traceAccess: {
        text: "Tracing the access point reveals a shadowy figure tampering with the AI core!",
        choices: ["Confront the Figure", "Hide and Observe"],
        consequence: ["confrontFigure", "observeFigure"],
        image: "images/traceaccess.jpg"
    },
    investigateFurther: {
        text: "You ignore the access point and explore more, but the AI system is shut down completely.",
        choices: ["Restart System", "Leave City"],
        consequence: ["systemRestart", "leaveCity"],
        image: "images/investigatefurther.jpg"
    },
    secureBackup: {
        text: "You successfully secured the backup core! The AI will be safe for now.",
        choices: [],
        consequence: [],
        image: "images/securebackup.jpg"
    },
    reportHQ: {
        text: "You report to HQ, but the AI’s backup core is compromised. The city is at risk!",
        choices: [],
        consequence: [],
        image: "images/reporthq.jpg"
    },
    confrontFigure: {
        text: "You confront the figure, but they escape, leaving the AI in a critical state.",
        choices: [],
        consequence: [],
        image: "images/confrontfigure.jpg"
    },
    observeFigure: {
        text: "You observe quietly as the figure leaves, allowing you to restore the AI without alerting them.",
        choices: [],
        consequence: [],
        image: "images/observefigure.jpg"
    },
    systemRestart: {
        text: "You restart the system successfully, bringing the AI back online. Mission accomplished!",
        choices: [],
        consequence: [],
        image: "images/systemrestart.jpg"
    },
    leaveCity: {
        text: "You decide to leave the city, abandoning the mission. The AI remains missing.",
        choices: [],
        consequence: [],
        image: "images/leavecity.jpg"
    }
};

// Initialize Audio Elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");

// Start the game
const startGame = () => {
    console.log("Game started");
    updatePage("start");
};

// Function to update the page content based on the story stage
const updatePage = (stageKey) => {
    console.log(`Updating page for stage: ${stageKey}`);
    const stage = story[stageKey];
    if (!stage) {
        console.error(`Stage ${stageKey} not found in story data`);
        return;
    }
    
    document.getElementById("storyText").innerText = stage.text;

    // Update image based on the current stage
    const storyImage = document.getElementById("storyImage");
    storyImage.src = stage.image;
    storyImage.alt = `Image for ${stageKey}`;

    // Clear previous choices and add new ones
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    stage.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;

        // Play click sound when a choice is made
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

// Mini-game: Simple decryption challenge
const decryptPuzzle = () => {
    console.log("Decrypting puzzle");
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
    console.log("Analyzing data");
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
    console.log("Toggling music");
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

// City area navigation
const exploreArea = (areaKey) => {
    console.log(`Exploring area: ${areaKey}`);
    updatePage(areaKey);
};

// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);
