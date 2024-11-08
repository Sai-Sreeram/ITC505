/* Root variables for color themes */
:root {
    --primary-color: #00ffcc;
    --secondary-color: #ff00ff;
    --background-color: #111;
    --text-color: #e0e0e0;
    --glow-color: rgba(0, 255, 255, 0.7);
}

body {
    font-family: 'Orbitron', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    text-align: center;
    margin: 0;
    padding: 0;
}

header {
    background: #222;
    padding: 20px;
    color: var(--primary-color);
    box-shadow: 0px 0px 20px var(--primary-color);
}

.subtitle {
    color: var(--secondary-color);
    font-size: 1.2em;
    text-shadow: 0 0 8px var(--secondary-color), 0 0 12px var(--secondary-color);
    margin-top: 10px;
}

#storyContainer {
    background: rgba(17, 17, 17, 0.9);
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0px 0px 15px var(--glow-color);
}

#choices {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    color: var(--text-color);
    background-color: #333;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 8px var(--glow-color);
}

button:hover {
    color: var(--secondary-color);
    background: #444;
    transform: translateY(-3px);
    box-shadow: 0 0 15px var(--primary-color), 0 0 25px var(--secondary-color);
}

#cityMap {
    background: rgba(34, 34, 34, 0.9);
    border: 2px solid var(--secondary-color);
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    box-shadow: 0px 0px 20px var(--secondary-color);
}

.map-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 10px;
}

#buttonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
}

#toggleMusic, #addendumBtn {
    background-color: #444;
    color: var(--primary-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;
}

#toggleMusic:hover, #addendumBtn:hover {
    color: var(--secondary-color);
    background: #333;
    box-shadow: 0 0 15px var(--primary-color), 0 0 25px var(--secondary-color);
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: #222;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0px 0px 15px var(--primary-color);
    color: var(--text-color);
    animation: modalFadeIn 0.5s;
}

.modal-content h2 {
    color: var(--primary-color);
    text-align: center;
}

.close {
    color: var(--secondary-color);
    float: right;
    font-size: 24px;
    cursor: pointer;
}

.close:hover {
    color: var(--primary-color);
}

@keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@media (max-width: 768px) {
    .modal-content {
        width: 90%;
        margin: 10% auto;
    }
}
