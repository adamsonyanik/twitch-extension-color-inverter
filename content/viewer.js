let isDarkMode = false;

function toggleDarkMode(){
  isDarkMode = !isDarkMode;
  setThemeMode();
}

function setThemeMode(){
  if (isDarkMode){
    document.getElementById("overlay").removeAttribute("hidden");
    document.getElementById("toggle-dark-mode-button").style.filter = "invert(100%)";
  } else {
    document.getElementById("overlay").setAttribute("hidden", true);
    document.getElementById("toggle-dark-mode-button").style.filter = "";
  }
}

function setButtonVisibilityIfNotButton(visible) {
  if (visible){
    document.getElementById("toggle-dark-mode-button").removeAttribute("hidden");
  } else {
    document.getElementById("toggle-dark-mode-button").setAttribute("hidden", true);
  }
}

window.onload = () => {
  document.getElementById("toggle-dark-mode-button").addEventListener("click", () => toggleDarkMode());

  document.getElementById("overlay-ui").addEventListener("mouseenter", () => setButtonVisibilityIfNotButton(true));
  document.getElementById("overlay-ui").addEventListener("mouseleave", () => setButtonVisibilityIfNotButton(false));

  setThemeMode();
}

let config = { clipPath: "inset(10% 20% 30% 40%)" };

const twitch = window.Twitch.ext;

twitch.configuration.onChanged(() => {
	if (twitch.configuration.broadcaster) {
		try {
			const newConfig = JSON.parse(twitch.configuration.broadcaster.content);
	  
			if (typeof newConfig === 'object') {
				config = newConfig;
				updateConfig();
			} else {
				console.err("Invalid config: " + newConfig);
			}
		} catch (e) {
	  		console.err("Invalid config: " + newConfig);
		}
	}
});

function updateConfig(){
  document.getElementById("overlay").style.clipPath = config.clipPath;
}