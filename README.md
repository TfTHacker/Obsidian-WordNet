# Obsidian-WordNet
WordNet plugin for Obsidian.  WordNet is a large lexical database of English terms developed by Princeton University and its license allows use in other applications.

WordNet is part of the Obsidian42 family of Obsidian plugins. Check out the others:
- [Text Transporter](https://github.com/TfTHacker/obsidian42-text-transporter) - advanced text management for Obsidian. 
- [Jump-to-Date](https://github.com/TfTHacker/obsidian42-jump-to-date) - Jump to a date via a convenient popup.


# Instructions
The WordNet dictionary can be accessed either through the command palette or the WordNet button on the ribbon. 

Once invoked, WordNet will allow you to input the word you want to look up. As you type, options are shown. Once you find the word that interests you, you can press enter to have it inserted into the current document. If the current document is in preview mode, the definition will be displayed in a notification window for about 10 seconds.

![Feature Preview](FeaturePreview.gif)


# Slash Command
WordNet plugin can also be accessed via a slash command, using ;; as demonstrated in this video: [New slash command feature](https://twitter.com/tfthacker/status/1454442949685784586).
- This feature can be toggled off in Settings
- The trigger for this slash command can be changed from the default ;; to anything you like in Settings

# Template insertions of dictionary definitions
- the format of the insertion of a term and its definition can be customized in Settings use the template section. The template should include {term} with the brackets and {definition} with the brackets for the insertion of the term and the definition.

# Custom Dictionary
You can develop your own custom dictionary for this plugin using these [instructions](README-CustomDictionary.md).


## Licensing
Dictionary provided by the [WordNet](https://wordnet.princeton.edu/) project of Princeton University. [WordNet license](https://raw.githubusercontent.com/TfTHacker/Obsidian-WordNet/main/LICENSE-WordNet)


