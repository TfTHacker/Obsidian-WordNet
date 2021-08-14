import { DataAdapter, FuzzyMatch, FuzzySuggestModal, MarkdownView, Notice, request, Vault } from 'obsidian';
import WordNetPlugin from './main';

interface Definition {
    SearchTerm: string,
    Term: string,
    Definition: string
}

export default class DictionarySuggester extends FuzzySuggestModal<Definition>{
    plugin: WordNetPlugin;
    adapter: DataAdapter;
    wordNet: Definition[];
    customDict: Definition[];

    constructor(plugin: WordNetPlugin) {
        super(plugin.app);
        this.plugin = plugin;

        this.setPlaceholder('type word to lookup in WordNet');

        setTimeout(async () => {
            //load the WordNet dictionary
            const pathWordNetJson = this.plugin.manifest.dir + '/dict-WordNet.json';
            const adapter = this.app.vault.adapter

            if (await adapter.exists(pathWordNetJson)) {
                const fileWordNet = await adapter.read(pathWordNetJson);
                this.wordNet = await JSON.parse(fileWordNet);
            } else {
                if(navigator.onLine===false) {
                    new Notice('You do not have an internet connection, and the WordNet dictionary cannot be downloaded. Please restore your interent connection and resteart Obsidian', 30000);
                    this.plugin.unload();
                } else {
                    const downloadMessage = new Notice("WordNet dictionary is being downloaded, this may take a few minutes. This message will disappear when the process is complete.", 0);
                    try {
                        const response = await fetch('https://wordnet.glitch.me/dict-WordNet.json');
                        downloadMessage.hide();
                        if (!response.ok) {
                            if(response.status === 404) {
                                new Notice(`The WordNet dictionary file is not currently available for download. Please try again later or contact the developer on Twitter: @TfThacker for support.`,30000);
                            } else {
                                console.log(`Error in WordNet dictinary: ${response.status}`);
                                new Notice(`An error has occured with the download, please try again later: ${response.status}`);    
                            }
                            this.plugin.unload();
                        } else {
                            this.wordNet = await response.json();
                            await adapter.write(pathWordNetJson, JSON.stringify(this.wordNet));
                        }                        
                    } catch (e) {
                        console.log(`Error in WordNet dictinary: ${e}`);
                        new Notice(`An error has occured with the download, please try again later: ${e}`);    
                        this.plugin.unload();            
                    }
                }
            }

            // users can define their own custom dictionary and place it in the plugins directory. 
            if (await adapter.exists(this.plugin.manifest.dir + '/dict-MyDict.json')) {
                const fileCustomDict = await adapter.read(this.plugin.manifest.dir + '/dict-MyDict.json');
                this.customDict = await JSON.parse(fileCustomDict);
            } else
                this.customDict = null;
        }, 10);
    }

    query(term: string): any {
        let results = [];
        const searchTerm = term.toLocaleLowerCase();
        let countOfFoundMatches = 0;
        if (this.customDict != null) {
            for (let i = 0; (i < this.customDict.length && countOfFoundMatches < 30); i++) {
                let item = this.customDict[i];
                if (item['SearchTerm'].startsWith(searchTerm)) {
                    results.push(this.customDict[i]);
                    countOfFoundMatches++;
                }
            }
        }
        countOfFoundMatches = 0;
        for (let i = 0; (i < this.wordNet.length && countOfFoundMatches < 20); i++) {
            let item = this.wordNet[i];
            if (item['SearchTerm'].startsWith(searchTerm)) {
                results.push(this.wordNet[i]);
                countOfFoundMatches++;
            }
        }
        return results;
    }

    getItems(): Definition[] {
        let searchTerm = '';

        if (this.inputEl.value.trim().length == 0) {
            const currentView: any = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (currentView != null && currentView.getMode() != undefined
                && currentView.editor.somethingSelected()) {
                searchTerm = currentView.editor.getSelection();
                this.inputEl.value = searchTerm;
                this.inputEl.setSelectionRange(0, searchTerm.length);
            }
        } else
            searchTerm = this.inputEl.value.trim()

        return searchTerm === '' ? [] : this.query(searchTerm)
    };

    getItemText(item: Definition) {
        return item.SearchTerm;
    }

    onChooseItem(item: Definition, evt: MouseEvent | KeyboardEvent) { }

    renderSuggestion(item: FuzzyMatch<Definition>, el: HTMLElement) {
        // el.innerHTML = '<b>' + item.item.Term + '</b><br/>' + item.item.Definition;
        el.createEl('b', {text: item.item.Term});
        el.createEl('br');
        el.appendText(item.item.Definition);
    }

    onChooseSuggestion(item: FuzzyMatch<Definition>, evt: MouseEvent | KeyboardEvent): void {
        const currentView: any = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
        if (currentView != null && currentView.getMode() === 'source') 
            currentView.editor.replaceSelection('**' + item.item.Term + '**\n' + item.item.Definition + '\n\n');
        else
            new Notice(item.item.Term + ' \n' + item.item.Definition, 10000);
    }

}