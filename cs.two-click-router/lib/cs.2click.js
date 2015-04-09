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
setinletassist(0, 'a buildslots will build a slot interface based on the provided arguments; a clear message will delete all modules');
setoutletassist(0, 'various');

// global variables from arguments to [js] object
var modulename = ''; // prefix name for module
if (jsarguments.length > 1) {
	modulename = jsarguments[1];
}
var channum = 2; // number of channels
if (jsarguments.length > 2) {
	if (/#/.test(jsarguments[2])) {	} else {
		channum = jsarguments[2];
	}
}
var slotnum = 2; // same as number of channels, but stable
if (jsarguments.length > 2) {
	if (/#/.test(jsarguments[2])) {	} else {
		slotnum = jsarguments[2];
	}
}
if(slotnum > 8) {slotnum = 8;} // limit number of slots to no more than 8
if(slotnum < 1) {slotnum = 1;} // stop 0 or negative slot numbers being passed
var slottype = "in"; // is in or out?
if (jsarguments.length > 3) {
	slottype = jsarguments[3];
}

// initialise global dictionary and MaxObject array
var twoclickDictionary = new Dict("cs.2click-routing-pairs");
var twoclickObjects = new Array(32); // Maxobj variables for scripting

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

			twoclickObjects[4*k] = this.patcher.newdefault( x, y, "textbutton", "@varname", modulename + "-" + (k+1) + "-" + slottype + "-slot-label", "@patching_rect", x, y, 15, 15, "@presentation_rect", x, y, 15, 15, "@presentation", 1, "@mode", 1, "@text", k+1, "@texton", k+1, "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.25, 0.25, 0.25, 1., "@textcolor", 0.96, 0.96, 0.96, 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);

			twoclickObjects[4*k+1] = this.patcher.newdefault( x+15, y, "textbutton", "@varname", modulename + "-" + (k+1) + "-" + slottype + "-slot-val", "@patching_rect", x+15, y, 90, 15, "@presentation_rect", x+15, y, 90, 15, "@presentation", 1, "@mode", 1, "@text", "[empty]", "@texton", "[empty]", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 0, "@bgcolor", 0.96, 0.96, 0.96, 1., "@textcolor", 0.2, 0.2, 0.2, "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);
		}

		// print done building confirmation in Max window
		if(modulename.length) {
			post(modulename + ':')
		}
		post('Done building ' + slotnum + ' ' + slottype + 'put(s).\n');
		setdict(); // add all the created slots to the global dictionary
		resizebpatcher();
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

// setdict -- adds all slots found in this patcher to the global dictionary
function setdict(val) {
	// iterate through slots and add/set them in the dictionary
	for(s=0;s<slotnum;s++) {
		dictaddress = modulename + "-" + (s+1) + "-" + slottype + "-slot";
		twoclickDictionary.set(dictaddress, 0);
	}
}

// cleardict -- empty the global dictionary
function cleardict() {
	twoclickDictionary.clear();
}

/*
//////     B P A T C H E R     //////
//////      M E T H O D S      //////
*/

function resizebpatcher() {
		post("resizebpatcher() called\n")
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
			error(modulename + " bpatcher: no patcher.box to resize\n");
		}
}
