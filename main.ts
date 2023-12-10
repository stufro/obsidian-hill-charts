import { Plugin } from 'obsidian';
import { renderHillChart } from './src/renderer';
import { parseCodeBlock } from './src/parser';
import { HillChartSettings } from './src/types'
import { SettingTab, DEFAULT_SETTINGS } from 'src/settings';

export default class HillCharts extends Plugin {
	settings: HillChartSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("hillchart", (source, el, ctx) => {
			const container = renderHillChart(parseCodeBlock(source, this.settings), this.settings);
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
