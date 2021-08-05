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
        this.adapter = this.plugin.app.vault.adapter;

        this.setPlaceholder('type word to lookup in WordNet');

        setTimeout(async () => {
            //load the WordNet dictionary
            const pathWordNetJson = this.plugin.manifest.dir + '/dict-WordNet.json';

            if (await this.adapter.exists(pathWordNetJson)) {
                const fileWordNet = await this.adapter.read(pathWordNetJson);
                this.wordNet = await JSON.parse(fileWordNet);
            } else {
                const downloadMessage = new Notice("WordNet dictionary is being configured, it will be available shortly.", 0);
                const response = await fetch('https://wordnet.glitch.me/dict-WordNet.json');
                downloadMessage.hide();
                if (!response.ok) {
                    new Notice(`An error has occured with the download, please try again later: ${response.status}`);
                } else {
                    this.wordNet = await response.json();
                    await this.adapter.write(pathWordNetJson, JSON.stringify(this.wordNet));
                }
            }

            // users can define their own custom dictionary and place it in the plugins directory. 
            if (await this.adapter.exists(this.plugin.manifest.dir + '/dict-MyDict.json')) {
                const fileCustomDict = await this.adapter.read(this.plugin.manifest.dir + '/dict-MyDict.json');
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
            const currentView: any = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
            if (currentView != null && currentView.getState().mode != undefined
                && currentView.editor.somethingSelected()) {
                searchTerm = currentView.editor.getSelection();
                this.inputEl.value = searchTerm;
                this.inputEl.setSelectionRange(0, searchTerm.length);
            }
        } else
            searchTerm = this.inputEl.value.trim()

        return searchTerm == '' ? [] : this.query(searchTerm)
    };

    getItemText(item: Definition) {
        return item.SearchTerm;
    }

    onChooseItem(item: Definition, evt: MouseEvent | KeyboardEvent) { }

    renderSuggestion(item: FuzzyMatch<Definition>, el: HTMLElement) {
        el.innerHTML = '<b>' + item.item.Term + '</b><br/>' + item.item.Definition;
    }

    onChooseSuggestion(item: FuzzyMatch<Definition>, evt: MouseEvent | KeyboardEvent): void {
        if (this.app.workspace.activeLeaf.getViewState().state.mode == 'source') {
            const active_view = this.app.workspace.getActiveViewOfType(MarkdownView);
            active_view.editor.replaceSelection('**' + item.item.Term + '**\n' + item.item.Definition + '\n\n');
        } else
            new Notice(item.item.Term + ' \n' + item.item.Definition, 10000);
    }

}