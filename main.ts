import { Plugin, Notice, parseYaml } from 'obsidian';
import { renderHillChart } from './src/renderer';
import { parseCodeBlock } from './src/parser';
import { HillChartSettings } from './src/types'
import { SettingTab, DEFAULT_SETTINGS } from 'src/settings';

const DEFAULT_ERROR = "An error occured rendering this hill chart. Please inspect the console logs."

export default class HillCharts extends Plugin {
	settings: HillChartSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("hillchart", (source, el, ctx) => {
			const parsedInput = parseCodeBlock(source, this.settings, parseYaml)

			if (parsedInput.ok) {
				const container = renderHillChart(parsedInput.points || [], this.settings);
				el.parentElement?.replaceChild(container || this.errorMessage(), el);
			} else {
				new Notice(parsedInput.error || DEFAULT_ERROR)
				el.parentElement?.replaceChild(this.errorMessage(parsedInput.error), el);
			}
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

	errorMessage(error = ""): Node {
		const element = document.createElement("i")
		element.textContent = `${DEFAULT_ERROR} ${error}`;
		return element;
	}
}
