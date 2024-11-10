// Confirm JavaScript file is loaded
console.log("JavaScript loaded");

// Story Data with all 15 stages, each with an associated image and addendum
const story = {
    start: {
        text: "You’re assigned to find the missing AI controlling the city. Start by choosing where to investigate.",
        choices: ["Check Surveillance Room", "Visit Data Center", "Question suspect in Tech Lab", "Explore AI Hub"],
        consequence: ["surveillanceRoom", "dataCenter", "techLab", "aiHub"],
        image: "assets/1.jpeg",
        addendum: "This starting stage introduces the player to the mission and sets up an interactive environment. I chose a 'city map' layout to provide clear visual clues and immediate choices, letting players quickly engage with the game. This aligns with the detective theme, as each location holds potential clues."
    },
    surveillanceRoom: {
        text: "You find some unusual activity in the surveillance data logs. It looks encrypted. Try to decrypt it.",
        choices: ["Decrypt Data", "Leave Room"],
        consequence: ["decryptPuzzle", "start"],
        image: "assets/2.jpeg",
        addendum: "In this stage, players encounter encryption—a technical skill in cybersecurity. I included this to simulate real-world cybersecurity challenges, where data decryption is crucial. The choice to decrypt or leave introduces risk, reflecting the real-world consequence of missed opportunities."
    },
    dataCenter: {
        text: "The Data Center shows no signs of a forced breach. You find a hidden file named 'AI_Location'.",
        choices: ["Analyze File", "Return to HQ"],
        consequence: ["dataAnalysis", "start"],
        image: "assets/3.jpeg",
        addendum: "Here, a hidden file represents subtle clues, adding depth to the investigation. I implemented this to mimic how data centers often have covert data. Analyzing the file challenges the player’s attention to detail and reinforces the investigative theme."
    },
    techLab: {
        text: "The suspect is nervous and gives you some clues. You need to choose your next step.",
        choices: ["Return to HQ", "Explore AI Hub"],
        consequence: ["start", "aiHub"],
        image: "assets/4.jpeg",
        addendum: "Introducing a suspect adds an interpersonal element, which is common in detective stories. I designed this choice to encourage player intuition, asking them to gauge if the AI Hub or HQ is the next logical step based on limited information."
    },
    aiHub: {
        text: "You arrive at the AI Hub and find clues that lead to the AI's last known location.",
        choices: ["Investigate Deep Storage", "Check Maintenance Logs"],
        consequence: ["deepStorage", "maintenanceLogs"],
        image: "assets/5.jpeg",
        addendum: "The AI Hub serves as the central hub for further investigation. Choices here represent strategic paths: 'Deep Storage' implies archived data, while 'Maintenance Logs' suggests recent activity. This setting heightens tension and narrows the focus of the investigation."
    },
    deepStorage: {
        text: "You find the AI’s backup core! But there’s a security breach.",
        choices: ["Attempt to Secure Backup", "Report to HQ"],
        consequence: ["secureBackup", "reportHQ"],
        image: "assets/6.jpeg",
        addendum: "Finding the AI’s backup core was a plot twist designed to intensify the mission. Players face a critical choice here—either securing the AI or escalating to HQ. This decision reflects real cybersecurity dilemmas, balancing immediate action with broader reporting protocols."
    },
    maintenanceLogs: {
        text: "The maintenance logs reveal an unauthorized access point.",
        choices: ["Trace the Access Point", "Ignore and Investigate Further"],
        consequence: ["traceAccess", "investigateFurther"],
        image: "assets/7.jpeg",
        addendum: "The Maintenance Logs provide technical clues through unauthorized access points. I included this to simulate real-world monitoring practices, where unauthorized access can expose vulnerabilities. This choice tests the player’s risk tolerance, adding suspense."
    },
    traceAccess: {
        text: "Tracing the access point reveals a shadowy figure tampering with the AI core!",
        choices: ["Confront the Figure", "Hide and Observe"],
        consequence: ["confrontFigure", "observeFigure"],
        image: "assets/8.jpeg",
        addendum: "Confronting a figure adds dramatic tension. I chose to let players either confront or observe, mimicking real investigation decisions where observation can be as valuable as direct confrontation, especially in security."
    },
    investigateFurther: {
        text: "You ignore the access point and explore more, but the AI system is shut down completely.",
        choices: ["Restart System", "Leave City"],
        consequence: ["systemRestart", "leaveCity"],
        image: "assets/9.jpeg",
        addendum: "Ignoring access points and continuing exploration represents a less cautious approach. This outcome shows the consequence of inaction, as the AI system shuts down. This teaches players the importance of following leads in investigation."
    },
    secureBackup: {
        text: "You successfully secured the backup core! The AI will be safe for now.",
        choices: [],
        consequence: [],
        image: "assets/10.jpeg",
        addendum: "Successfully securing the core provides a rewarding ending. I created this outcome to reflect the fulfillment of a successful investigation and to reinforce the detective theme, where persistence pays off."
    },
    reportHQ: {
        text: "You report to HQ, but the AI’s backup core is compromised. The city is at risk!",
        choices: [],
        consequence: [],
        image: "assets/11.jpeg",
        addendum: "Reporting to HQ about the compromised core brings attention to the AI threat but risks leaving the core unsecured."
    },
    confrontFigure: {
        text: "You confront the figure, but they escape, leaving the AI in a critical state.",
        choices: [],
        consequence: [],
        image: "assets/12.jpeg",
        addendum: "Confronting the figure led to their escape, resulting in the AI's compromised state. Further action may be needed."
    },
    observeFigure: {
        text: "You observe quietly as the figure leaves, allowing you to restore the AI without alerting them.",
        choices: [],
        consequence: [],
        image: "assets/13.jpeg",
        addendum: "Choosing to observe and restore the AI represents a balanced approach. I designed this ending to reward players who prioritize stealth and patience in their decisions."
    },
    systemRestart: {
        text: "You restart the system successfully, bringing the AI back online. Mission accomplished!",
        choices: [],
        consequence: [],
        image: "assets/14.jpeg",
        addendum: "Restarting the AI system brings it back online, concluding the mission successfully."
    },
    leaveCity: {
        text: "You decide to leave the city, abandoning the mission. The AI remains missing.",
        choices: [],
        consequence: [],
        image: "assets/15.jpeg",
        addendum: "Leaving the city results in mission failure, showing the consequences of abandonment. This reinforces the theme that detectives should remain committed to their cases, regardless of difficulty."
    }
};

// Initialize Audio Elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");

// Start the game
const startGame = () => {
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

    // Get the stage data from the story object
    const stage = story[stageKey];
    if (!stage) return;

    document.getElementById("storyText").innerText = stage.text;
    document.getElementById("storyImage").src = stage.image;
    document.getElementById("addendumContent").innerText = stage.addendum;

    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
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

const toggleAddendum = () => {
    const addendum = document.getElementById("addendum");
    addendum.style.display = addendum.style.display === "flex" ? "none" : "flex";
};

// Mini-games for specific stages
const decryptPuzzle = () => {
    const attempt = prompt("Enter decryption key (Hint: 1337):");
    if (attempt === "1337") {
        alert("Decryption successful! You found a lead.");
        updatePage("dataCenter");
    } else {
        alert("Decryption failed. Try again.");
    }
};

const dataAnalysis = () => {
    const data = prompt("Analyze data pattern (Enter 1234 for success):");
    if (data === "1234") {
        alert("Analysis successful! This data points to the AI’s possible location.");
        updatePage("aiHub");
    } else {
        alert("Analysis inconclusive. Try again.");
    }
};

const toggleMusic = () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.getElementById("toggleMusic").textContent = "🔇 Music Off";
    } else {
        backgroundMusic.pause();
        document.getElementById("toggleMusic").textContent = "🔊 Music On";
    }
};

document.getElementById("toggleMusic").onclick = toggleMusic;
document.addEventListener("DOMContentLoaded", startGame);
