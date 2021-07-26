# Obsidian-WordNet
WordNet plugin for Obsidian.  WordNet is a large lexical database of English developed by Princeton University and its license allows use in other applications.

# Licensing
Dictionary provided by the [WordNet](https://wordnet.princeton.edu/) project of Princeton University. [WordNet license](https://raw.githubusercontent.com/TfTHacker/Obsidian-WordNet/main/LICENSE-WordNet)


# Custom dictionary
This plugin allows you to add a custom dictionary. The plugin uses the Sqlite3 datbase engine. To create a custom database requries knowledge of working with Sqlite. The basic process is as follows:

- Create a sqlite database file and name it custom.sqlite
- The database should have the following schema:
  - CREATE TABLE words (word TEXT, definition TEXT, type TEXT);
  - CREATE INDEX word_idx ON words (word ASC);
- Column description for the words table:
  - word - the word to be looked up by the plugin
  - definition - the definition of the word
  - type - the type of word, for example: adj for adjective
- Add your data to the custom.sqlite word table
- Put the custom.sqlite file into this plugins .plugin folder

