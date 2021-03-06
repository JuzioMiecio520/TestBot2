module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Store Member Info",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Member Control",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const members = ['Mentioned User', 'Command Author', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const info = ['Member Object', 'Member ID', 'Member Username', 'Member Display Name', 'Member Color', 'Member Server', 'Member Last Message', 'Member Highest Role', 'Member Hoist Role', 'Member Color Role', 'Member Game', 'Member Status', 'Member Avatar URL', 'Member Role List', 'Member Join Date', 'Member Voice Channel', 'Member Discrim', 'Member Account Creation Date','Member Tag', 'Member Last Message ID', 'Member Roles Amount', 'Member Permissions List', 'Member Custom Status']
	return `${members[parseInt(data.member)]} - ${info[parseInt(data.info)]}`;
},

//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

// Who made the mod (If not set, defaults to "DBM Mods")
author: "DBM, Lasse, TheMonDon & Cap",

// The version of the mod (Defaults to 1.0.0)
version: "1.9.6", //Added in 1.9.2

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Store Member Information",

// If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods


//---------------------------------------------------------------------

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	const info = parseInt(data.info);
	let dataType = 'Unknown Type';
	switch(info) {
		case 0:
			dataType = "Server Member";
			break;
		case 1:
			dataType = "Server Member ID";
			break;
		case 2:
		case 3:
		case 10:
		case 11:
		case 16:
		case 18:
		case 22:
			dataType = "Text";
			break;
		case 4:
			dataType = "Color";
			break;
		case 5:
			dataType = "Server";
			break;
		case 6:
			dataType = "Message";
			break;
		case 7:
		case 8:
		case 9:
			dataType = "Role";
			break;
		case 12:
			dataType = "Image URL";
			break;
		case 13:
		case 21: // Added by Cap in 1.9.6
			dataType = "List";
			break;
		case 14:
		case 17:
			dataType = "Date";
			break;
		case 15:
			dataType = "Voice Channel";
			break;
		case 19:
			dataType = "Message ID";
			break;
		case 20: // Added by Cap in 1.9.6
			dataType = "Number";
			break;
	}
	return ([data.varName2, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["member", "varName", "info", "storage", "varName2"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
	<div><p>This action has been modified by DBM Mods.</p></div><br>
<div>
	<div style="float: left; width: 35%;">
		Source Member:<br>
		<select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer')">
			${data.members[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div>
	<div style="padding-top: 8px; width: 70%;">
		Source Info:<br>
		<select id="info" class="round">
			<option value="0" selected>Member Object</option>
			<option value="1">Member ID</option>
			<option value="2">Member Username</option>
			<option value="3">Member Display Name</option>
			<option value="16">Member Discrim (#XXXX)</option>
			<option value="18">Member Tag (User#XXXX)</option>
			<option value="4">Member Color</option>
			<option value="10">Member Game</option>
			<option value="11">Member Status</option>
			<option value="22">Member Custom Status</option>
			<option value="12">Member Avatar URL</option>
			<option value="5">Member Server</option>
			<option value="21">Member Permissions List</option>
			<option value="14">Member Join Date</option>
			<option value="17">Member Account Creation Date</option>
			<option value="15">Member Voice Channel</option>
			<option value="6">Member Last Message</option>
			<option value="19">Member Last Message ID</option>
			<option value="13">Member Role List</option>
			<option value="20">Member Roles Amount</option>
			<option value="7">Member Highest Role</option>
			<option value="8">Member Hoist Role</option>
			<option value="9">Member Color Role</option>
		</select>
	</div>
</div><br>
<div>
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer2" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName2" class="round" type="text"><br>
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.memberChange(document.getElementById('member'), 'varNameContainer');
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const member = parseInt(data.member);
	const varName = this.evalMessage(data.varName, cache);
	const info = parseInt(data.info);
	const mem = this.getMember(member, varName, cache);
	if(!mem) {
		this.callNextAction(cache);
		return;
	}
	const server = cache.server;
	let result;
	switch(info) {
		case 0:
			result = mem;
			break;
		case 1:
			result = mem.id;
			break;
		case 2:
			if(mem.user) {
				result = mem.user.username;
			}
			break;
		case 3:
			result = mem.displayName;
			break;
		case 4:
			result = mem.displayHexColor;
			break;
		case 5:
			result = mem.guild;
			break;
		case 6:
			result = mem.lastMessage;
			break;
		case 7:
			result = mem.highestRole;
			break;
		case 8:
			result = mem.hoistRole;
			break;
		case 9:
			result = mem.colorRole;
			break;
			//Removed "Check if member" stuff from here. ~TheMonDon
		case 10:
			if(mem.presence && mem.presence.game) {
				result = mem.presence.game.name;
			}
			break;
		case 11:
			if(mem.presence) {
				const status = mem.presence.status;
				if(status === 'online') result = 'Online';
				else if(status === 'offline') result = 'Offline';
				else if(status === 'idle') result = 'Zaraz wracam';
				else if(status === 'dnd') result = 'Nie przeszkadzać';
			}
			break;
		case 12:
			if(mem.user) {
				result = mem.user.displayAvatarURL;
			}
			break;
		case 13:
			if(mem.roles) {
				result = mem.roles.array();
			}
			break;
		case 14:
			result = mem.joinedAt;
			break;
		case 15:
			result = mem.voiceChannel;
			break;
		case 16:
			if(mem.user) {
				result = mem.user.discriminator;
			}
			break;
		case 17:
			if (mem.user) {
				result = mem.user.createdAt;
			}
			break;
		case 18:
			if (mem.user) {
				result = mem.user.tag;
			}
			break;
		case 19:
			result = mem.lastMessageID;
			break;
		case 20: // Added by Cap in 1.9.6
			result = mem.roles.size;
			break;
		case 21: // Added by Cap in 1.9.6
	        result = mem.permissions.toArray().join(", ").replace(/_/g, " ").toLowerCase();
			break;
		case 22: //Added by LeonZ
			if (mem.presence.game && mem.presence.game.type == 4) {
				result = mem.presence.game.state;
			}
			break;
		default:
			break;
	}
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName2 = this.evalMessage(data.varName2, cache);
		this.storeValue(result, storage, varName2, cache);
	}
	this.callNextAction(cache);
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module
