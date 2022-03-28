const ci = {
    DEFAULT_CONFIG: { clipPath: "inset(0% 0% 0% 0%)", filter: "invert(85%) hue-rotate(180deg)" },
    config: undefined,

    _TWITCH: window.Twitch.ext,

    pushTwitchConfig(twitchConfig) {
        ci._TWITCH.configuration.set('broadcaster', '0.0.2', JSON.stringify(twitchConfig));
    },

    _initColorInverter() {
        ci.config = ci.DEFAULT_CONFIG;
        ci._TWITCH.configuration.onChanged(ci._loadConfig);
    },

    _loadConfig() {
        if (ci._TWITCH.configuration.broadcaster) {
            let newConfig;
            try {
                newConfig = JSON.parse(ci._TWITCH.configuration.broadcaster.content);
                ci.updateConfig(newConfig);
            } catch (e) {
                console.error(e);
                console.error("Invalid config: ");
                console.error(newConfig);
            }
        }
    },

    updateConfig(newConfig) {
        if (typeof newConfig === 'object') {
            ci.config = newConfig;

            for (const [key] of Object.entries(ci.DEFAULT_CONFIG)) {
                if (!newConfig[key])
                    newConfig[key] = ci.DEFAULT_CONFIG[key];
            }

            updateConfigUI();
        } else {
            console.error("Invalid config: ");
            console.error(newConfig);
        }
    },

    getEl(id) {
        return document.getElementById(id);
    },
}

ci._initColorInverter();