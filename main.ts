import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { renderHillChart } from './src/renderer';
import { parseCodeBlock } from 'src/parser';

interface HillChartSettings {
	chartHeight: number;
	chartWidth: number;
}

const DEFAULT_SETTINGS: HillChartSettings = {
	chartHeight: 250,
	chartWidth: 700,
}

export default class HillCharts extends Plugin {
	settings: HillChartSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("hillchart", (source, el, ctx) => {
			const container = renderHillChart(parseCodeBlock(source), this.settings);
			el.parentElement?.replaceChild(container.node(), el);
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
			.setName('Default Height')
			.setDesc('Height in pixels')
			.addText(text => text
				.setValue(`${this.plugin.settings.chartHeight || DEFAULT_SETTINGS.chartHeight}`)
				.onChange(async (value) => {
					this.plugin.settings.chartHeight = parseInt(value);
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Default Width')
			.setDesc('Width in pixels')
			.addText(text => text
				.setValue(`${this.plugin.settings.chartWidth || DEFAULT_SETTINGS.chartWidth}`)
				.onChange(async (value) => {
					this.plugin.settings.chartWidth = parseInt(value);
					await this.plugin.saveSettings();
				}));
	}
}
