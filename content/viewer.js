let isDarkTheme = false;

const toggleDarkThemeButtonId = "toggle-dark-theme-button";
const overlayId = "overlay";
const overlayUiId = "overlay-ui";

function updateConfigUI() {
    ci.getEl(overlayId).style.clipPath = ci.config.clipPath;
    ci.getEl(overlayId).style.backdropFilter = ci.config.filter;
    ci.getEl(overlayId).style.webkitBackdropFilter = ci.config.filter;
}

window.onload = () => {
    ci.getEl(toggleDarkThemeButtonId).addEventListener("click", toggleDarkTheme);

    ci.getEl(overlayUiId).addEventListener("mouseenter", () => setButtonVisibile(true));
    ci.getEl(overlayUiId).addEventListener("mouseleave", () => setButtonVisibile(false));

    updateConfigUI();
    setTheme();
}

function toggleDarkTheme() {
    isDarkTheme = !isDarkTheme;
    setTheme();
}

function setTheme() {
    if (isDarkTheme) {
        ci.getEl(overlayId).removeAttribute("hidden");
        ci.getEl(toggleDarkThemeButtonId).style.filter = "invert(100%)";
    } else {
        ci.getEl(overlayId).setAttribute("hidden", true);
        ci.getEl(toggleDarkThemeButtonId).style.filter = "";
    }
}

function setButtonVisibile(visible) {
    if (visible) {
        ci.getEl(toggleDarkThemeButtonId).removeAttribute("hidden");
    } else {
        ci.getEl(toggleDarkThemeButtonId).setAttribute("hidden", true);
    }
}