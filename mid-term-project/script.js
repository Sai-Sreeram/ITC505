// Confirm JavaScript is loaded
console.log("JavaScript loaded");

// Story Data
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
    },
    aiHub: {
        text: "You arrive at the AI Hub and find the missing AI!",
        choices: ["Celebrate", "End Investigation"],
        consequence: ["celebrate", "end"],
    },
    celebrate: {
        text: "You successfully recovered the missing AI! Mission complete.",
        choices: [],
        consequence: [],
    },
    end: {
        text: "The investigation is over. Thank you for playing!",
        choices: [],
        consequence: [],
    }
};

// Initialize Audio Elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");
let musicPlayed = false; // Flag to track if music has started

// Start the game
const startGame = () => {
    console.log("Game started");
    updatePage("start");
};

// Function to update the page content based on the story stage
const updatePage = (stageKey) => {
    console.log(`Updating page for stage: ${stageKey}`);
    
    // Handle special cases for mini-games
    if (stageKey === "decryptPuzzle") {
        console.log("Triggering decryptPuzzle mini-game");
        decryptPuzzle();
        return;
    } else if (stageKey === "dataAnalysis") {
        console.log("Triggering dataAnalysis mini-game");
        dataAnalysis();
        return;
    }
    
    // Get the stage data from the story object
    const stage = story[stageKey];
    if (!stage) {
        console.error(`Stage ${stageKey} not found in story data`);
        return;
    }
    
    document.getElementById("storyText").innerText = stage.text;

    // Clear previous choices and add new ones
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    stage.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;

        // Play click sound and start music on the first interaction
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
    console.log("Toggling music");
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.getElementById("toggleMusic").textContent = "🔊 Music On";
    } else {
        backgroundMusic.pause();
        document.getElementById("toggleMusic").textContent = "🔇 Music Off";
    }
};

// Attach event listener for music toggle
document.getElementById("toggleMusic").onclick = toggleMusic;

// City area navigation
const exploreArea = (areaKey) => {
    console.log(`Exploring area: ${areaKey}`);
    updatePage(areaKey);
};

// Addendum Modal Functions
const openAddendum = () => {
    document.getElementById("addendumModal").style.display = "block";
};

const closeAddendum = () => {
    document.getElementById("addendumModal").style.display = "none";
};

// Close modal when clicking outside the content area
window.onclick = (event) => {
    const modal = document.getElementById("addendumModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);
