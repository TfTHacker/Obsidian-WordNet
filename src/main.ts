import { Plugin } from "obsidian";
import TheEditorSuggestor from "./EditSuggest";
import {
	DEFAULT_SETTINGS,
	WordNetSettingTab,
	type WordNetSettings,
} from "./settings";
import DictionarySuggester from "./suggester";

export default class WordNetPlugin extends Plugin {
	settings: WordNetSettings;
	ribbonIcon: HTMLElement;
	dictionarySuggestor: DictionarySuggester;
	editSuggester: TheEditorSuggestor;

	configureRibbonCommand(): void {
		this.ribbonIcon = this.addRibbonIcon(
			"book-open-check",
			"WordNet Dictionary",
			async () => {
				this.dictionarySuggestor.open();
			},
		);
	}

	async onload(): Promise<void> {
		console.log("loading WordNet plugin");

		await this.loadSettings();

		this.addSettingTab(new WordNetSettingTab(this.app, this));

		this.dictionarySuggestor = new DictionarySuggester(this);

		if (this.settings.enableRibbon) this.configureRibbonCommand();

		this.addCommand({
			id: "open-wordnet-suggestor",
			name: "Look up a word",
			callback: () => {
				this.dictionarySuggestor.open();
			},
		});

		this.editSuggester = new TheEditorSuggestor(this);
		this.registerEditorSuggest(this.editSuggester);
	}

	onunload(): void {
		console.log("unloading WordNet plugin");
	}

	renderDefinitionFromTemplate(term: string, definition: string): string {
		return this.settings.insertTemplate
			.replace("{term}", term)
			.replace("{definition}", definition);
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
