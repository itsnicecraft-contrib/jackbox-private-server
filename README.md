# jackbox-private-server
An attempt to make a private server for all jackbox games<br />
If you found a bug or want to help me, create an issue or write me on Discord: @klucva
## Unfinished functions
* Do Do Re Mi (you need to skip playbacks)
* FixyText
* User episodes
* Artifacts and galleries

In the current state of the project you can play all games except those listed above
## How to connect to the game?
To connect to the game you need your clone of jackbox.tv and in all scripts where ecast.jackboxgames.com appears, replace it with your server address

Maybe in the future I will publish a script for cloning jackbox.tv
## Setup
In config.json you need to change:
* serverUrl by your server address (please note that serverUrl is also found in the configs of the games quiplash3, Everyday, WorldChampions, JackboxTalks and BlankyBlank)
* polly accessKeyId and secretAccessKey by your amazon aws keys
* polly uploadUrl by your url, which accepts multipart/form-data with 'file' and the name of this file, uploads it to the server and returns a link to the file or changes a status code if an error occurs
* internalToken by your token (used in debug, external requests and polly responses upload)
* allowedOrigins by list of your urls for Access-Control-Allow-Origin header
* ssl cert and key by path to your ssl cert and key (with ./ at the start of file path)

If you want, you can change game configs, but I don't recommend to do this

Next you need to install modules:
`npm i xmlhttprequest request ws express aws-sdk`

Then run server by command `node server.js` and enjoy!
## I need a help!
If you know how text-map (for FixyText) or song-render (for Do Do Re Mi) works, please create an issue or write me on Discord: @klucva
