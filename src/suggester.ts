import { App, Plugin_2,FuzzyMatch,  FuzzySuggestModal, ToggleComponent } from 'obsidian';
import WordNetPlugin  from './main';
import DatabaseLayer from './database';

interface Definition   {
    SearchTerm: string,
    Term: string,
    Definition: string
}

export default class DictionarySuggester extends FuzzySuggestModal<Definition>{
	plugin: WordNetPlugin;
    db: DatabaseLayer;
    wordNet: Definition[];
    customDict: Definition[];

    constructor(plugin: WordNetPlugin) {
        super(plugin.app);
        this.plugin = plugin;

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

            // this.query('hi')
        }, 10);        
    }

    query(term:  string): any  {
        console.log('term: ' + term);
        let results = [];
        const searchTerm = term.toLocaleLowerCase();
        let countOfFoundMatches = 0;
        for(let i = 0; ( i < this.wordNet.length && countOfFoundMatches < 20); i++) {
            let item = this.wordNet[i];
            if(item['SearchTerm'].startsWith(searchTerm)) {
                results.push(this.wordNet[i]);
                countOfFoundMatches++;
            }
        }
        countOfFoundMatches = 0;
        for(let i = 0; ( i < this.customDict.length && countOfFoundMatches < 20); i++) {
            let item = this.customDict[i];
            if(item['SearchTerm'].startsWith(searchTerm)) {
                results.push(this.customDict[i]);
                countOfFoundMatches++;
            }
        }
        console.log(JSON.stringify(results,null,2));
        return results;
    }

    getItems(): Definition[] { 
        let results = [];
        if(this.inputEl.value.trim().length==0) 
            for(let i=1; i<10; i++)
                results.push(this.wordNet[i]);
        else 
            results=this.query(this.inputEl.value);
        return results; 
    };

    getItemText(item: Definition) { return item.Term; }

    onChooseItem(item: Definition, evt: MouseEvent | KeyboardEvent) {
        console.log('onChooseItem')
    }

    renderSuggestion(item: FuzzyMatch<Definition>, el: HTMLElement) {
        // console.log('render ' + JSON.stringify(item.item))
        el.innerText = item.item.Term }


    onChooseSuggestion(item: FuzzyMatch<Definition>, evt: MouseEvent | KeyboardEvent): void {
console.log('onChooseSuggestion')
    }

}