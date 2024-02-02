const express = require("express");
const utils = require("./utils.js");
const Room = require("./room.js");
const router = express.Router();

router.get("/api/v2/app-configs/:appTag", (req, res) => {
	if(!global.jbg.appConfigs[req.params.appTag]) return res.status(404).send({
		ok: false,
		error: "Not Found"
	});
	res.send({
		ok: true,
		body: {
			appTag: req.params.appTag,
			appVersion: 0,
			platform: "win",
			settings: global.jbg.appConfigs[req.params.appTag]
		}
	});
});

router.post("/api/v2/rooms", (req, res) => {
	let userId = req.body.userId || req.query.userId;
	let appTag = req.body.appTag || req.query.appTag;
	if(!userId) return res.status(400).send({
		ok: false,
		error: "invalid parameters: missing required field userId"
	});
	if(!appTag) return res.status(400).send({
		ok: false,
		error: "invalid parameters: missing required field appTag"
	});
	if(!global.jbg.games.appTags[appTag]) return res.status(400).send({
		ok: false,
		error: "the provided appTag \""+appTag+"\" is not a known app tag"
	});
	let room = new Room(req.body || req.query);
	if(room.roomExists) return res.status(500).send({
		ok: false,
		error: "unable to reserve a room: already exists"
	});
	global.jbg.rooms[room.roomId] = room;
	return res.send({
		ok: true,
		body: {
			host: global.jbg.serverUrl,
			code: room.roomId,
			token: room.token
		}
	});
});

router.get("/api/v2/rooms/:roomId", (req, res) => {
	let room = global.jbg.rooms[req.params.roomId];
	if(!room) return res.status(404).send({
		ok: false,
		error: "no such room"
	});
	res.send({
		ok: true,
		body: {
			appId: room.getApp().id,
			appTag: room.getApp().tag,
			audienceEnabled: room.isAudienceEnabled(),
			code: room.roomId,
			host: global.jbg.serverUrl,
			audienceHost: global.jbg.serverUrl,
			locked: room.isLocked(),
			full: room.isFull(),
			maxPlayers: room.config.maxPlayers,
			minPlayers: room.config.minPlayers,
			moderationEnabled: room.isModerationEnabled(),
			passwordRequired: room.isPasswordRequired(),
			twitchLocked: room.isTwitchLocked(),
			locale: room.config.locale,
			keepalive: room.keepalive,
			controllerBranch: ""
		}
	});
});

router.get("/api/v2/rooms/:roomId/play", (req, res) => {
	res.header('Content-Type', 'text/plain');
	res.status(400).send('Bad Request\n{\n  "ok": false,\n  "error": "websocket: the client is not using the websocket protocol: \'upgrade\' token not found in \'Connection\' header"\n}');
});

router.get("/api/v2/audience/:roomId/play", (req, res) => {
	res.header('Content-Type', 'text/plain');
	res.status(400).send({
		"ok": false,
		"error": "missing Sec-WebSocket-Protocol header"
	});
});

router.post("/api/v2/controller/state", (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
