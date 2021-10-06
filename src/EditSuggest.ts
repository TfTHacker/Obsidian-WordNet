import { Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, MarkdownView, Notice, PopoverSuggest, PopoverSuggest, TFile } from "obsidian";
import WordNetPlugin from "./main";
import { Definition } from "./suggester";

export default class TheEditorSuggestor extends EditorSuggest<Definition> {
    plugin: WordNetPlugin;
    pattern: RegExp;
    lastEditorSuggestTriggerInfo: EditorSuggestTriggerInfo;

    constructor(plugin: WordNetPlugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.pattern =  new RegExp(".*;;(.*)$");; 
    }

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo {
        const range = editor.getRange( { line: cursor.line, ch: 0 }, { line: cursor.line, ch: cursor.ch } );
        const testResults = this.pattern.exec(range);
        if(!testResults)
            return null;
        else {
            const suggestText = testResults[1];
            this.lastEditorSuggestTriggerInfo = {
                        start:  { line: cursor.line, ch: cursor.ch - suggestText.length - 2 },
                        end: { line: cursor.line, ch: cursor.ch },
                        query: testResults[1]
                    }
            return this.lastEditorSuggestTriggerInfo;
        }
    }
    getSuggestions(context: EditorSuggestContext): Promise<Definition[]> {
        return this.plugin.dictionarySuggestor.query(context.query)
    }

    renderSuggestion(item: Definition, el: HTMLElement): void {
        el.createEl('b', {text: item.Term});
        el.createEl('br');
        el.appendText(item.Definition);
    }

    selectSuggestion(item: Definition, evt: MouseEvent | KeyboardEvent): void {
        const currentView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
        this.close();
        if(evt.ctrlKey) {
            new Notice(item.Term + ' \n' + item.Definition, 60000);
            currentView.editor.replaceRange('', 
                this.lastEditorSuggestTriggerInfo.start,
                this.lastEditorSuggestTriggerInfo.end);
        }
        else
            currentView.editor.replaceRange('**' + item.Term + '**\n' + item.Definition + '\n', 
                this.lastEditorSuggestTriggerInfo.start,
                this.lastEditorSuggestTriggerInfo.end);
    }
}
