import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { renderHillChart } from './src/renderer';

interface HillChartSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HillChartSettings = {
	mySetting: 'default'
}

export default class HillCharts extends Plugin {
	settings: HillChartSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));


		const data = [
			{ percentage: 40, color: "red" },
			{ percentage: 20, color: "cyan" },
			{ percentage: 55, color: "green" },
		]
		this.registerMarkdownCodeBlockProcessor("hillchart", (source, el, ctx) => {
			renderHillChart(el, data);
		});
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: HillCharts;

	constructor(app: App, plugin: HillCharts) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
