let defaultConfig = { clipPath: "inset(0% 0% 0% 0%)", filter: "invert(85%) hue-rotate(180deg)" };
let config = defaultConfig;

function updateConfigUI(){
	document.getElementById("clip-path-input").value = config.clipPath;
	document.getElementById("filter-input").value = config.filter;
}

const twitch = window.Twitch.ext;

window.onload = () => {
	document.getElementById("save-button").addEventListener("click", () => saveConfig());
	document.getElementById("reset-button").addEventListener("click", () => resetConfig());
}

function setTwitchConfig(twitchConfig){
	twitch.configuration.set('broadcaster', '0.0.2', JSON.stringify(twitchConfig));
}

function saveConfig(){
	config.clipPath = document.getElementById("clip-path-input").value;
	config.filter = document.getElementById("filter-input").value;

	setTwitchConfig(config);
}

function resetConfig(){
	setTwitchConfig(defaultConfig);
	updateConfig(defaultConfig);
}

function updateConfig(newConfig){
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

function loadConfig(){
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
}

twitch.configuration.onChanged(loadConfig);