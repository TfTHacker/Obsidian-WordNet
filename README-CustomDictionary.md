# Custom Dictionary
In addition  to the WordNet dictionary, this plugin allows  you to provide your own file with your own dictionary items. If a custom  dictionary is provided to the plugin, then both your custom dictionary and the WordNet dictionary will be used for lookups,  but giving your custom dictionary priority in the results of a search.

## Creating a custom dictionary.
1. Create a file named **dict-MyDict.json** in the .obsidian/plugins/obsidian-wordnet folder
2. Add your dictionary items in proper json  format. It should look like this:
```
[ 
    {"SearchTerm": "word1", "Term": "Word 1", "Definition": "Definition of word 1"},
    {"SearchTerm": "word2", "Term": "Word 2", "Definition": "Definition of word 2"}
]
```
- Note that SearchTerm is the field that this plugin uses for  looking up words in your custom dictionary. SearchTerm should be all lowercase and  have no spaces.
- Term and Definition are what is displayed when a match is found 
