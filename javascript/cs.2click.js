// cs.2click.js
//
// manage 2click in- & output modules globally
//
//

// dev settings
autowatch = 1;

/*
//////    G L O B A L    //////
//////  S E T T I N G S  //////
*/

// inlets and outlets
inlets = 1;
outlets = 1;
setinletassist(0, 'an addclearbutton or removeclearbutton message followed by a slot scripting name will add or remove a clear button to that slot');
setoutletassist(0, 'various');

// maximum number of slots
var maxslots = 8;

// global variables from arguments to [js] object
// prefix name for module (#1)
var modulename = '';
if (jsarguments.length > 1) {
	modulename = jsarguments[1];
}
// number of slots (#2)
var slotnum = maxslots;
if (jsarguments.length > 2) {
	// make sure argument isn’t a #arg (when opening patcher directly)
	if (/#/.test(jsarguments[2])) {	} else {
		slotnum = jsarguments[2];
		if(slotnum > maxslots) {slotnum = maxslots;} // limit maximum number of slots
		if(slotnum < 1) {slotnum = 1;} // stop 0 or negative slot numbers being passed
	}
}
// whether module slots are in– or output (set within inputs/outputs patchers)
var slottype = "in";
if (jsarguments.length > 3) {
	slottype = jsarguments[3];
}
// unique instance ID (#0)
var uiid = Math.round(Math.random()*100000);
if (jsarguments.length > 4) {
	uiid = jsarguments[4];
}

// initialise global dictionary and MaxObject array
var twoclickPairs = new Dict("cs.2click-routing-pairs");
var twoclickMeta = new Dict("cs.2click-meta");
var twoclickObjects = new Array(32); // Maxobj variables for scripting
var twoclickInOutlets = new Array(8); // Maxobj array for inlets/outlets

/*
//////    G L O B A L    //////
//////   M E T H O D S   //////
*/

// notifydeleted -- called when module deleted
function notifydeleted() {
	if(twoclickMeta.get(modulename + '::id')) {
		testid = twoclickMeta.get(modulename + '::id');
		if(testid == uiid) {
			tidyDict();
			clearMeta();
		}
	}
}

// loadbang -- called when [bpatcher] is created or reinstantiated
function loadbang() {
	clear();
	buildslots();
	if(slottype === 'out') {
		buildinlets();
	}
	if(slottype === 'in') {
		buildoutlets();
	}
	setDict(); // add all the created slots to the global dictionary
	// resizebpatcher(); // deprecated until bug fix possible
	setMeta();
}

/*
//////     M E T A   D I C T     //////
//////       M E T H O D S       //////
*/

setMeta.local = 1;
function setMeta() {
	twoclickMeta.replace(modulename + '::id', uiid); // register this module with its UIID to the meta dictionary
	twoclickMeta.replace(modulename + '::type', slottype); // register module type of this module in the meta dictionary
	twoclickMeta.replace(modulename + '::size', slotnum); // register size of this module in the meta dictionary
	// create a string "1 2 3 … n" representing the slots where n = the highest slot number
	var slothistory = '';
	for(s=0;s<slotnum;s++) {
		index = (s+1) + " ";
		if(s+1==slotnum) {
			index = (s+1);
		}
		slothistory = slothistory.concat(index);
	}
	// register slot history string to this module in the meta dictionary
	twoclickMeta.replace(modulename + '::history', slothistory);
}

clearMeta.local = 1;
function clearMeta() {
	twoclickMeta.remove(modulename); // remove this module from the flags dictionary
}

/*
//////        U I        //////
//////   M E T H O D S   //////
*/

// clear -- removes all modules
function clear()
{
	this.patcher.apply(function(object) {
		if (/-in-slot/.test(object.varname) || /-out-slot/.test(object.varname)) {
			this.patcher.remove(object);
		}
	});
}

// buildslots -- generates the in/out slot interface
function buildslots()
{
		// iterate args
		for(k=0;k<slotnum;k++)
		{
			x = 0; // set object’s x co-ordinate
			y = 15 * (k+1); // set object’s y co-ordinate
			twoclickObjects[4*k+3] = this.patcher.newdefault( x, y, "ubutton", "@varname", modulename + "-" + (k+1) + "-" + slottype + "-slot", "@patching_rect", x, y, 105, 15, "@presentation_rect", x, y, 105, 15, "@presentation", 1, "@hltcolor", 0.05, 0.97, 0.39, 0.5, "@rounded", 0);

			twoclickObjects[4*k] = this.patcher.newdefault( x, y, "textbutton", "@varname", modulename + "-" + (k+1) + "-" + slottype + "-slot-label", "@patching_rect", x, y, 15, 15, "@presentation_rect", x, y, 15, 15, "@presentation", 1, "@mode", 1, "@text", k+1, "@texton", k+1, "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.25, 0.25, 0.25, 1., "@textcolor", 0.96, 0.96, 0.96, 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1., "@usebgoncolor", 1, "@ignoreclick", 1);

			twoclickObjects[4*k+1] = this.patcher.newdefault( x+15, y, "textbutton", "@varname", modulename + "-" + (k+1) + "-" + slottype + "-slot-val", "@patching_rect", x+15, y, 90, 15, "@presentation_rect", x+15, y, 90, 15, "@presentation", 1, "@mode", 1, "@text", "[empty]", "@texton", "[empty]", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 0, "@truncate", 2, "@bgcolor", 0.96, 0.96, 0.96, 1., "@textcolor", 0.2, 0.2, 0.2, "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1., "@usebgoncolor", 1, "@ignoreclick", 1);

			this.patcher.bringtofront(twoclickObjects[4*k+3]);
		}
}

// addclearbutton -- add a clear slot button to a given slot number & type
function addclearbutton(val)
{
	if(arguments.length)  // bail if no arguments
	{
		k = arguments[0] - 1; // set k from slot number
		scriptingname = modulename + '-' + (k+1) + "-" + slottype + "-slot-clear";
		x = 0; // set object’s x co-ordinate
		y = 15 * (k+1); // set object’s y co-ordinate
		// execute -- remove if already there, then add
		removeclearbutton(arguments[0]);
		twoclickObjects[4*k+2] = this.patcher.newdefault( x+105, y, "textbutton", "@varname", scriptingname, "@patching_rect", x+105, y, 15, 15, "@presentation_rect", x+105, y, 15, 15, "@presentation", 1, "@text", "✖", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.99, 0.41, 0.43, 1., "@textcolor", 1., 1., 1., 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@bgovercolor", 1., 0., 0., 1., "@textovercolor", 0., 0., 0., 1. );
	}
	else // complain about arguments
	{
		error("addclearbutton message needs an argument: number of slot to add clear button to (int);\n");
	}
}

// removeclearbutton -- remove a clear button for a given slot number & type
function removeclearbutton(val)
{
	if(arguments.length)  // bail if no arguments
	{
		k = arguments[0] - 1; // set k from slot number
		scriptingname = modulename + '-' + (k+1) + "-" + slottype + "-slot-clear";
		this.patcher.apply(function(object) {
			if (object.varname == scriptingname) {
				this.patcher.remove(object);
			}
		});
	}
	else // complain about arguments
	{
		error("removeclearbutton message needs an argument: number of slot to remove clear button from (int)\n");
	}
}

/*
//////   D I C T I O N A R Y   //////
//////      M E T H O D S      //////
*/

// setDict -- adds all slots found in this patcher to the global dictionary
function setDict(val) {
	// iterate through slots and add/set them in the dictionary
	for(s=0;s<slotnum;s++) {
		dictaddress = modulename + "-" + (s+1) + "-" + slottype + "-slot";
		twoclickPairs.set(dictaddress, 0);
	}
	// remove slots that are no longer needed
	if(slotnum<maxslots) {
		leftover = maxslots - slotnum;
		dict = twoclickPairs.getkeys(); // get all the dictionary’s keys
		for(l=0;l<leftover;l++) {
			dictaddress = modulename + "-" + (l+slotnum+1) + "-" + slottype + "-slot";
			teststring = new RegExp(escapeRegExp(dictaddress));
			// if this dictionary key is found in the list of keys, remove it
			if(teststring.test(dict)) {
				twoclickPairs.remove(dictaddress);
			}
		}
	}
}

// tidyDict -- remove all this module’s slots from the global dictionary
function tidyDict() {
	dict = twoclickPairs.getkeys(); // get all the dictionary’s keys
	for(s=0;s<maxslots;s++) {
		dictaddress = modulename + "-" + (s+1) + "-" + slottype + "-slot";
		teststring = new RegExp(escapeRegExp(dictaddress));
		// if this dictionary key is found in the list of keys, remove it
		if(teststring.test(dict)) {
			twoclickPairs.remove(dictaddress);
		}
	}
}

// escapeRegExp -- utility to escape strings in tidyDict()
function escapeRegExp(val) {
    return val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// cleardict -- empty the global dictionary
function cleardict() {
	twoclickPairs.clear();
}

/*
//////     B P A T C H E R     //////
//////      M E T H O D S      //////
*/

// resizebpatcher -- tries to get [bpatcher]’s box and fit it snugly to the UI elements
function resizebpatcher() {
    if (this.patcher.box) {
				// get current patcher box
        coordinates = this.patcher.box.rect;
				height = slotnum*15 + 15;
				width = 120;
				// use current position and apply new size
        this.patcher.box.rect = [coordinates[0],coordinates[1],coordinates[0]+width,coordinates[1]+height];
    }
		else {
			// error message
			// error(modulename + " bpatcher: no patcher.box to resize\n");
		}
}

// buildinlets -- uses global slotnum variable to generate [bpatcher] inlets
function buildinlets() {
	// create appropriate number of inlets if not already present
	for(k=0;k<slotnum;k++) {
		inletvarname = modulename + "-" + (k+1) + "-" + "inlet";
		if(!this.patcher.getnamed(inletvarname)) {
			// create inlet
			x = 1020 + (k*30); // set object’s x co-ordinate
			y = 570; // set object’s y co-ordinate
			twoclickInOutlets[k] = this.patcher.newdefault( x, y, "inlet", "@varname", inletvarname, "@patching_rect", x, y, 25, 25, "@comment", "(signal) Audio signal to be output (ch "+(k+1)+")");
		}
	}
	// remove surplus inlets if present
	if(slotnum<maxslots) {
		surplus = maxslots - slotnum;
		for(l=0;l<surplus;l++) {
			inletvarname = modulename + "-" + (l+slotnum+1) + "-" + "inlet";
			if(this.patcher.getnamed(inletvarname)) {
				markedfordeletion = this.patcher.getnamed(inletvarname);
				this.patcher.remove(markedfordeletion);
			}
		}
	}
	// connect inlets to [p #1-audio-sends]
	patchervarname = modulename+"-audio-sends"; // scripting name of subpatch
	sendpatcher = this.patcher.getnamed(patchervarname); // subpatch object
	if(sendpatcher) {
		for(k=0;k<slotnum;k++) {
			inletvarname = modulename + "-" + (k+1) + "-" + "inlet"; // scripting name of inlet
			if(this.patcher.getnamed(inletvarname)) {
				inletobj = this.patcher.getnamed(inletvarname); // inlet object
				this.patcher.connect(inletobj, 0, sendpatcher, k);
			}
		}
	}
} // end of buildinlets()

// buildoutlets -- uses global slotnum variable to generate [bpatcher] outlets
function buildoutlets() {
	// create appropriate number of outlets if not already present
	for(k=0;k<slotnum;k++) {
		outletvarname = modulename + "-" + (k+1) + "-" + "outlet";
		if(!this.patcher.getnamed(outletvarname)) {
			// create outlet
			x = 1020 + (k*30); // set object’s x co-ordinate
			y = 600; // set object’s y co-ordinate
			twoclickInOutlets[k] = this.patcher.newdefault( x, y, "outlet", "@varname", outletvarname, "@patching_rect", x, y, 25, 25, "@comment", "(signal) Audio signal received (ch "+(k+1)+")");
		}
	}
	// remove surplus outlets if present
	if(slotnum<maxslots) {
		surplus = maxslots - slotnum;
		for(l=0;l<surplus;l++) {
			outletvarname = modulename + "-" + (l+slotnum+1) + "-" + "outlet";
			if(this.patcher.getnamed(outletvarname)) {
				markedfordeletion = this.patcher.getnamed(outletvarname);
				this.patcher.remove(markedfordeletion);
			}
		}
	}
	// connect outlets to [p #1-audio-sends]
	patchervarname = modulename+"-audio-receives"; // scripting name of subpatch
	sendpatcher = this.patcher.getnamed(patchervarname); // subpatch object
	if(sendpatcher) {
		for(k=0;k<slotnum;k++) {
			outletvarname = modulename + "-" + (k+1) + "-" + "outlet"; // scripting name of outlet
			if(this.patcher.getnamed(outletvarname)) {
				outletobj = this.patcher.getnamed(outletvarname); // outlet object
				this.patcher.connect(sendpatcher, k, outletobj, 0);
			}
		}
	}
} // end of buildoutlets()
