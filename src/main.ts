import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, ToggleComponent } from 'obsidian';
import DictionarySuggester  from './suggester'

interface WordNetSettings {
	enableRibbon: boolean;
}

const DEFAULT_SETTINGS: WordNetSettings = {
	enableRibbon: true
}

export default class WordNetPlugin extends Plugin {
	settings: WordNetSettings;
	dictionarySuggestor: DictionarySuggester;
	ribbonIcon: HTMLElement;
	configureRibbonCommand() {
		this.ribbonIcon = this.addRibbonIcon('dice', 'WordNet Dictionary', async () => {
			new Notice('TODO: link to dictionary');
			// this.dictionarySuggestor.getSuggestions('');
			this.dictionarySuggestor.open();

		});	
	}

	async onload() {
		console.log('loading WordNet plugin');

		await this.loadSettings();

		this.dictionarySuggestor = new DictionarySuggester(this);

		if(this.settings.enableRibbon) 
			this.configureRibbonCommand();

		this.addCommand({
			id: 'open-wordnet-suggestor',
			name: 'Look up a word',
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						// logic here
					}
					return true;
				}
				return false;
			}
		});


		// this.addSettingTab(new WordNetSettingTab(this.app, this));

		// this.registerCodeMirror((cm: CodeMirror.Editor) => {
		// 	console.log('codemirror', cm);
		// });

		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
		console.log('unloading WordNet plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class WordNetSettingTab extends PluginSettingTab {
	plugin: WordNetPlugin;

	constructor(app: App, plugin: WordNetPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;
		containerEl.empty();
		containerEl.createEl('h2', {text: 'WordNet Dictionary Setting'});
		new Setting(containerEl)
			.setName('Enable Ribbon Support')
			.setDesc('Toggle on and off the WordNet dictionary button in the ribbon.')
			.addToggle((cb: ToggleComponent) => {
				cb.setValue(this.plugin.settings.enableRibbon);
				cb.onChange(async (value: boolean) => {
				  this.plugin.settings.enableRibbon = value;
				  if(this.plugin.settings.enableRibbon==false)
				  	this.plugin.ribbonIcon.remove();
				  else
				  	this.plugin.configureRibbonCommand();

				  await this.plugin.saveSettings();
				});
			  });
	}
}
