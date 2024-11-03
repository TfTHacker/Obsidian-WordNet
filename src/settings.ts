import {
	type App,
	Setting,
	type TextAreaComponent,
	type TextComponent,
	type ToggleComponent,
} from "obsidian";
import { PluginSettingTab } from "obsidian";
import type WordNetPlugin from "./main";

export interface WordNetSettings {
	slashCommandEnabled: boolean;
	slashCommandShortcut: string;
	insertTemplate: string;
}

export const DEFAULT_SETTINGS: WordNetSettings = {
	slashCommandEnabled: true,
	slashCommandShortcut: ";;",
	insertTemplate: "**{term}**\n{definition}\n",
};

export class WordNetSettingTab extends PluginSettingTab {
	plugin: WordNetPlugin;

	constructor(app: App, plugin: WordNetPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Slash command")
			.setDesc("Enable the slash command for WordNet.")
			.addToggle((cb: ToggleComponent) => {
				cb.setValue(this.plugin.settings.slashCommandEnabled);
				cb.onChange(async (value: boolean) => {
					this.plugin.settings.slashCommandEnabled = value;
					await this.plugin.saveSettings();
				});
			});

		let cbShortcut: TextComponent;
		new Setting(containerEl)
			.setName("Slash command characters")
			.setDesc(
				"The characters that will invoke the slash command. The command character cannot be a space.",
			)
			.addExtraButton((b) => {
				b.setIcon("reset")
					.setTooltip("Reset to default")
					.onClick(async () => {
						this.plugin.settings.slashCommandShortcut =
							DEFAULT_SETTINGS.slashCommandShortcut;
						await this.plugin.saveSettings();
						this.plugin.editSuggester.updatePattern();
						cbShortcut.setValue(this.plugin.settings.slashCommandShortcut);
					});
			})
			.addText((cb: TextComponent) => {
				cbShortcut = cb;
				cb.setValue(this.plugin.settings.slashCommandShortcut);
				cb.onChange(async (value: string) => {
					const newValue =
						value.trim().length === 0
							? DEFAULT_SETTINGS.slashCommandShortcut
							: value;
					this.plugin.settings.slashCommandShortcut = newValue;
					await this.plugin.saveSettings();
					this.plugin.editSuggester.updatePattern();
				});
			});

		let cbTemplate: TextAreaComponent;
		new Setting(containerEl)
			.setName("Template for inserting a definition")
			.setDesc(
				"The template used for inserting a WordNet definition. Use {term} for the term looked up and {definition} for the defintion of that term.",
			)
			.addExtraButton((b) => {
				b.setIcon("reset")
					.setTooltip("Reset to default")
					.onClick(async () => {
						this.plugin.settings.insertTemplate =
							DEFAULT_SETTINGS.insertTemplate;
						await this.plugin.saveSettings();
						cbTemplate.setValue(this.plugin.settings.insertTemplate);
					});
			})
			.addTextArea((cb: TextAreaComponent) => {
				cbTemplate = cb;
				cb.setValue(this.plugin.settings.insertTemplate);
				cb.onChange(async (value: string) => {
					const newValue =
						value.trim().length === 0 ? DEFAULT_SETTINGS.insertTemplate : value;
					this.plugin.settings.insertTemplate = newValue;
					await this.plugin.saveSettings();
				});
				cb.inputEl.rows = 2;
				cb.inputEl.cols = 40;
			});
	}
}
