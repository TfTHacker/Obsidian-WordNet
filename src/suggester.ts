import { FuzzyMatch,  FuzzySuggestModal, MarkdownView, Notice } from 'obsidian';
import WordNetPlugin  from './main';

interface Definition   {
    SearchTerm: string,
    Term: string,
    Definition: string
}

export default class DictionarySuggester extends FuzzySuggestModal<Definition>{
	plugin: WordNetPlugin;
    wordNet: Definition[];
    customDict: Definition[];

    constructor(plugin: WordNetPlugin) {
        super(plugin.app);
        this.plugin = plugin;

        this.setPlaceholder('type word to lookup in WordNet');

        setTimeout( async () => {
            //load the WordNet dictionary
            const fileWordNet = await this.plugin.app.vault.adapter.read(this.plugin.manifest.dir + '/dict-WordNet.json' );
            this.wordNet = await JSON.parse(fileWordNet);
            // users can define their own custom dictionary and place it in the plugins directory. 
            if( await this.plugin.app.vault.adapter.exists(this.plugin.manifest.dir + '/dict-MyDict.json')) {
                const fileCustomDict = await this.plugin.app.vault.adapter.read(this.plugin.manifest.dir + '/dict-MyDict.json' );
                this.customDict = await JSON.parse(fileCustomDict);    
            } else
                this.customDict = null;
        }, 10);        
    }

    query(term:  string): any  {
        let results = [];
        const searchTerm = term.toLocaleLowerCase();
        let countOfFoundMatches = 0;
        if(this.customDict!=null) {
            for(let i = 0; ( i < this.customDict.length && countOfFoundMatches < 30); i++) {
                let item = this.customDict[i];
                if(item['SearchTerm'].startsWith(searchTerm)) {
                    results.push(this.customDict[i]);
                    countOfFoundMatches++;
                }
            }    
        }
        countOfFoundMatches = 0;
        for(let i = 0; ( i < this.wordNet.length && countOfFoundMatches < 20); i++) {
            let item = this.wordNet[i];
            if(item['SearchTerm'].startsWith(searchTerm)) {
                results.push(this.wordNet[i]);
                countOfFoundMatches++;
            }
        }
        return results;
    }

    getItems(): Definition[] { 
        return this.inputEl.value.trim().length==0 ? [] : this.query(this.inputEl.value) 
    };

    getItemText(item: Definition) { 
        return item.SearchTerm; 
    }

    onChooseItem(item: Definition, evt: MouseEvent | KeyboardEvent) {}

    renderSuggestion(item: FuzzyMatch<Definition>, el: HTMLElement) {
        el.innerHTML = '<b>' + item.item.Term + '</b><br/>' + item.item.Definition;
    }

    onChooseSuggestion(item: FuzzyMatch<Definition>, evt: MouseEvent | KeyboardEvent): void {
        if ( this.app.workspace.activeLeaf.getViewState().state.mode=='source') {
            const active_view = this.app.workspace.getActiveViewOfType(MarkdownView);
            const editor = active_view.editor;
            const doc = editor.getDoc();
            doc.replaceSelection( '**' + item.item.Term + '**\n' + item.item.Definition + '\n\n' );        
        } else 
            new Notice( item.item.Term + ' \n' + item.item.Definition, 10000 );
        
    }

}