import { App, Plugin_2, normalizePath } from 'obsidian';
import WordNetPlugin  from './main'


export default class DatabaseLayer {
	plugin: WordNetPlugin;
    wordNet: any;
    customDict:  any;

    constructor(plugin: WordNetPlugin) { 
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

            this.query('hi')
        }, 10);
    };

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



}