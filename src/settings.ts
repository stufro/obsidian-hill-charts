import { App, PluginSettingTab, Setting } from 'obsidian';
import HillCharts from 'main';
import { HillChartSettings } from './types';

const DEFAULT_SETTINGS: HillChartSettings = {
  chartHeight: 250,
  chartWidth: 700,
  pointSize: 10,
}

class SettingTab extends PluginSettingTab {
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

    new Setting(containerEl)
      .setName('Point Size')
      .setDesc('Radius in pixels')
      .addText(text => text
        .setValue(`${this.plugin.settings.pointSize || DEFAULT_SETTINGS.pointSize}`)
        .onChange(async (value) => {
          this.plugin.settings.pointSize = parseInt(value);
          await this.plugin.saveSettings();
        }));
  }
}

export { SettingTab, DEFAULT_SETTINGS };