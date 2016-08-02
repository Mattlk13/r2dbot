'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var lodoash = require('lodash');
var Bot = require('slackbots');

var R2dBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'r2dbot';

    this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(R2dBot, Bot);

R2dBot.prototype.run = function () {
    R2dBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
R2dBot.prototype._onStart = function () {
    this._loadBotUser();

};

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
R2dBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromBot(message) &&
        this._isMentioningBot(message)
    ) {
        this._replyWithMessage(message);
    }
};

R2dBot.prototype._replyWithMessage = function (originalMessage) {
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, '<@' + originalMessage.user + '> sorry, I did not understand that', {as_user: true});
};

/**
 * Loads the user object representing the bot
 * @private
 */
R2dBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

// Check if a message is a real time message
R2dBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

// Check if message is directed to a channel
R2dBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

// Check if the message is mentioning the bot
R2dBot.prototype._isMentioningBot = function (message) {
    return message.text.toLowerCase().indexOf('r2dbot') > -1 ||
        message.text.toLowerCase().indexOf(this.user.id.toLowerCase()) > -1;
};

// Check if message if from the bot
R2dBot.prototype._isFromBot = function (message) {
    return message.user === this.user.id;
};

// get ID of channel
R2dBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = R2dBot;
