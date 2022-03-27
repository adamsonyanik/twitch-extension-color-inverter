let isDarkMode = false;

function toggleDarkMode(){
  isDarkMode = !isDarkMode;
  setThemeMode();
}

function setThemeMode(){
  if (isDarkMode){
    document.getElementById("overlay-1").removeAttribute("hidden");
    document.getElementById("overlay-2").removeAttribute("hidden");
    
    document.getElementById("toggle-dark-mode-button").style.filter = "invert(100%)";
  } else {
    document.getElementById("overlay-1").setAttribute("hidden", true);
    document.getElementById("overlay-2").setAttribute("hidden", true);

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

let config = { corner: "none", width: "0", height: "0" };

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
  document.getElementById("overlay-1").style.width = "100%";
  document.getElementById("overlay-1").style.left = "0";

  document.getElementById("overlay-2").style.width = 100 - config.width + "%";
  document.getElementById("overlay-2").style.height = config.height + "%";

  if (config.corner == "top-left"){
    document.getElementById("overlay-1").style.height = (100 - config.height) + "%";
    document.getElementById("overlay-1").style.top = config.height + "%";

    document.getElementById("overlay-2").style.left = config.width + "%";
    document.getElementById("overlay-2").style.top = "0";
  }
  else if (config.corner == "top-right"){
    document.getElementById("overlay-1").style.height = (100 - config.height) + "%";
    document.getElementById("overlay-1").style.top = config.height + "%";

    document.getElementById("overlay-2").style.left = "0";
    document.getElementById("overlay-2").style.top = "0";
  }
  else if (config.corner == "bottom-left"){
    document.getElementById("overlay-1").style.height = (100 - config.height) + "%";
    document.getElementById("overlay-1").style.top = "0";

    document.getElementById("overlay-2").style.left = config.width + "%";
    document.getElementById("overlay-2").style.top = 100 - config.height + "%";
  }
  else if (config.corner == "bottom-right"){
    document.getElementById("overlay-1").style.height = (100 - config.height) + "%";
    document.getElementById("overlay-1").style.top = "0";

    document.getElementById("overlay-2").style.left = "0";
    document.getElementById("overlay-2").style.top = 100 - config.height + "%";
  }
  else if (config.corner == "none"){
    document.getElementById("overlay-1").style.height = "100%";
    document.getElementById("overlay-1").style.top = "0";

    document.getElementById("overlay-2").style.width = "0";
    document.getElementById("overlay-2").style.height = "0";
  }
}