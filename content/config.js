let config = { corner: "none", width: "0", height: "0" };

const twitch = window.Twitch.ext;

function saveConfig(){
	config.corner = document.getElementById("corner-select").value;
	config.width = document.getElementById("width-input").value;
	config.height = document.getElementById("height-input").value;

	twitch.configuration.set('broadcaster', '0.0.1', JSON.stringify(config));
}

function updateConfig(){
	document.getElementById("corner-select").value = config.corner;
	document.getElementById("width-input").value = config.width;
	document.getElementById("height-input").value = config.height;
}

window.onload = () => {
	document.getElementById("save-button").addEventListener("click", () => saveConfig());
}

twitch.configuration.onChanged(() => {
	if (twitch.configuration.broadcaster) {
		let newConfig;
		try {
			newConfig = JSON.parse(twitch.configuration.broadcaster.content);
	  
			if (typeof newConfig === 'object') {
				config = newConfig;
				updateConfig();
			} else {
				console.error("Invalid config: ");
				console.error(newConfig);
			}
		} catch (e) {
			console.error(e);
			console.error("Invalid config: ");
			console.error(newConfig);
		}
	}
});