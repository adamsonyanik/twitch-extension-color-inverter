const clipPathInputId = "clip-path-input";
const filterInputId = "filter-input";
const saveButtonId = "save-button";
const resetButtonId = "reset-button";

function updateConfigUI() {
	ci.getEl(clipPathInputId).value = ci.config.clipPath;
	ci.getEl(filterInputId).value = ci.config.filter;
}

window.onload = () => {
	ci.getEl(saveButtonId).addEventListener("click", saveConfig);
	ci.getEl(resetButtonId).addEventListener("click", resetConfig);
}

function saveConfig() {
	ci.config = {
		clipPath: ci.getEl(clipPathInputId).value,
		filter: ci.getEl(filterInputId).value
	};

	ci.pushTwitchConfig(ci.config);
}

function resetConfig() {
	ci.pushTwitchConfig(ci.DEFAULT_CONFIG);
	ci.updateConfig(ci.DEFAULT_CONFIG);
}