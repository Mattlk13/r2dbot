#!/usr/bin/env node

var R2dBot = require('../lib/r2dbot');

/**
 * Environment variables used to configure the bot:
 *
 *  BOT_API_KEY : the authentication token to allow the bot to connect to your slack organization. You can get your
 *      token at the following url: https://<yourorganization>.slack.com/services/new/bot (Mandatory)
 *  BOT_DB_PATH: the path of the SQLite database used by the bot
 *  BOT_NAME: the username you want to give to the bot within your organisation.
 */
var token = process.env.BOT_API_KEY || require('../token');
// var dbPath = process.env.BOT_DB_PATH;
var name = 'r2dbot';

var r2dBot = new R2dBot({
    token: token,
    name: name
});

r2dBot.run();
