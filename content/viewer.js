let defaultConfig = { clipPath: "inset(0% 0% 0% 0%)" };
let config = defaultConfig;

let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    setThemeMode();
}

function setThemeMode() {
    if (isDarkMode) {
        document.getElementById("overlay").removeAttribute("hidden");
        document.getElementById("toggle-dark-mode-button").style.filter = "invert(100%)";
    } else {
        document.getElementById("overlay").setAttribute("hidden", true);
        document.getElementById("toggle-dark-mode-button").style.filter = "";
    }
}

function setButtonVisibilityIfNotButton(visible) {
    if (visible) {
        document.getElementById("toggle-dark-mode-button").removeAttribute("hidden");
    } else {
        document.getElementById("toggle-dark-mode-button").setAttribute("hidden", true);
    }
}

function updateConfigUI() {
    document.getElementById("overlay").style.clipPath = config.clipPath;
}

window.onload = () => {
    document.getElementById("toggle-dark-mode-button").addEventListener("click", () => toggleDarkMode());

    document.getElementById("overlay-ui").addEventListener("mouseenter", () => setButtonVisibilityIfNotButton(true));
    document.getElementById("overlay-ui").addEventListener("mouseleave", () => setButtonVisibilityIfNotButton(false));

    updateConfigUI();
    setThemeMode();
}

const twitch = window.Twitch.ext;

twitch.configuration.onChanged(() => {
    if (twitch.configuration.broadcaster) {
        let newConfig;
        try {
            newConfig = JSON.parse(twitch.configuration.broadcaster.content);
            updateConfig(newConfig);
        } catch (e) {
            console.error(e);
            console.error("Invalid config: ");
            console.error(newConfig);
        }
    }
});

function updateConfig(newConfig) {
    if (typeof newConfig === 'object') {
        config = newConfig;

        for (const [key] of Object.entries(defaultConfig)) {
            if (!newConfig[key])
                newConfig[key] = defaultConfig[key];
        }

        updateConfigUI();
    } else {
        console.error("Invalid config: ");
        console.error(newConfig);
    }
}