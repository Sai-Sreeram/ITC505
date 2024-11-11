// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

// Story Data with all 15 stages, each with an associated image and addendum
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
        image: "assets/1.jpeg",
        addendum: "This starting stage introduces the player to the mission and sets up an interactive environment."
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
        image: "assets/2.jpeg",
        addendum: "In this stage, players encounter encryption—a technical skill in cybersecurity."
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
        image: "assets/3.jpeg",
        addendum: "Here, a hidden file represents subtle clues, adding depth to the investigation."
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
        image: "assets/4.jpeg",
        addendum: "Introducing a suspect adds an interpersonal element."
    },
    aiHub: {
        text: "You arrive at the AI Hub and find clues that lead to the AI's last known location.",
        choices: ["Investigate Deep Storage", "Check Maintenance Logs"],
        consequence: ["deepStorage", "maintenanceLogs"],
        image: "assets/5.jpeg",
        addendum: "The AI Hub serves as the central hub for further investigation."
    },
    deepStorage: {
        text: "You find the AI’s backup core! But there’s a security breach.",
        choices: ["Attempt to Secure Backup", "Report to HQ"],
        consequence: ["secureBackup", "reportHQ"],
        image: "assets/6.jpeg",
        addendum: "Finding the AI’s backup core was a plot twist designed to intensify the mission."
    },
    // End stage examples
    secureBackup: {
        text: "You successfully secured the backup core! The AI will be safe for now.",
        choices: [], // No choices for end stages
        consequence: [],
        image: "assets/10.jpeg",
        addendum: "Successfully securing the core provides a rewarding ending."
    },
    leaveCity: {
        text: "You decide to leave the city, abandoning the mission. The AI remains missing.",
        choices: [], // No choices for end stages
        consequence: [],
        image: "assets/15.jpeg",
        addendum: "Leaving the city results in mission failure."
    }
    // Continue defining remaining stages as necessary
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

    // Check for mini-game stages
    if (stageKey === "decryptPuzzle") {
        decryptPuzzle();
        return;
    } else if (stageKey === "dataAnalysis") {
        dataAnalysis();
        return;
    }

    const stage = story[stageKey];
    if (!stage) return;

    document.getElementById("storyText").innerText = stage.text;
    const storyImage = document.getElementById("storyImage");
    storyImage.src = stage.image;
    storyImage.alt = `Image for ${stageKey}`;
    document.getElementById("addendumContent").innerText = stage.addendum;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    if (stage.choices.length === 0) {
        document.getElementById("restartButton").style.display = "block";
        document.querySelector('.blur-overlay').style.display = "block"; // Show blur overlay at end
    } else {
        document.getElementById("restartButton").style.display = "none";
        document.querySelector('.blur-overlay').style.display = "none"; // Hide blur overlay during gameplay
    }

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
