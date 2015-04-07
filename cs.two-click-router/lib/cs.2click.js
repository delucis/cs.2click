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
setinletassist(0, 'inchannum followed by an int between 1 and 8 will create an interface for routing that many input channels; outchannum followed by an int between 1 and 8 will create an interface for routing that many output channels; a clear message will delete all modules');
setoutletassist(0, 'various');

// global variables and arrays
var channum = 0;
var modulename = '';
if (jsarguments.length > 1) {
	modulename = jsarguments[1];
}
var slotnum = 2;
if (jsarguments.length > 2) {
	slotnum = jsarguments[2];
}

var twoclickDictionary = new Dict("cs.2click-routing-pairs"); // for dictionary management
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
function buildslots(val)
{
	if(arguments.length) // bail if no arguments
	{
		// parse arguments
		channum = arguments[0]; // number of slots to build
		if(channum > 8) {channum = 8;}
		if(channum < 1) {channum = 1;}
		chantype = arguments[1]; // whether slot is in or out

		// iterate args
		for(k=0;k<channum;k++)
		{
			x = 0; // set object’s x co-ordinate
			y = 15 * (k+1); // set object’s y co-ordinate
			twoclickObjects[4*k+3] = this.patcher.newdefault( x, y, "ubutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot", "@patching_rect", x, y, 105, 15, "@presentation_rect", x, y, 105, 15, "@presentation", 1, "@hltcolor", 0.05, 0.97, 0.39, 0.5, "@rounded", 0);
			twoclickObjects[4*k] = this.patcher.newdefault( x, y, "textbutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot-label", "@patching_rect", x, y, 15, 15, "@presentation_rect", x, y, 15, 15, "@presentation", 1, "@mode", 1, "@text", k+1, "@texton", k+1, "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.25, 0.25, 0.25, 1., "@textcolor", 0.96, 0.96, 0.96, 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);
			twoclickObjects[4*k+1] = this.patcher.newdefault( x+15, y, "textbutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot-val", "@patching_rect", x+15, y, 90, 15, "@presentation_rect", x+15, y, 90, 15, "@presentation", 1, "@mode", 1, "@text", "[empty]", "@texton", "[empty]", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 0, "@bgcolor", 0.96, 0.96, 0.96, 1., "@textcolor", 0.2, 0.2, 0.2, "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);
		}

		// print done building confirmation in Max window
		if(modulename.length) {
			post(modulename + ':')
		}
		post('Done building ' + channum + ' ' + chantype + 'put(s).\n');
		setdict(); // add all the created slots to the global dictionary

	}

	else // complain about arguments
	{
		error("buildslots message needs arguments:\n1 — number of channels (int); 2 — in or out (symbol)\n");
	}
}

// addclearbutton -- add a clear slot button to a given slot number & type
function addclearbutton(val)
{
	if(arguments.length)  // bail if no arguments
	{
		k = arguments[0] - 1; // set k from slot number
		chantype = arguments[1]; // set channel type (in/out)
		scriptingname = modulename + '-' + (k+1) + "-" + chantype + "-slot-clear";
		x = 0; // set object’s x co-ordinate
		y = 15 * (k+1); // set object’s y co-ordinate
		// execute -- remove if already there, then add
		removeclearbutton(arguments[0], arguments[1]);
		twoclickObjects[4*k+2] = this.patcher.newdefault( x+105, y, "textbutton", "@varname", scriptingname, "@patching_rect", x+105, y, 15, 15, "@presentation_rect", x+105, y, 15, 15, "@presentation", 1, "@text", "✖", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.99, 0.41, 0.43, 1., "@textcolor", 1., 1., 1., 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@bgovercolor", 1., 0., 0., 1., "@textovercolor", 0., 0., 0., 1. );
	}
	else // complain about arguments
	{
		error("addclearbutton message needs arguments:\n1 — number of slot to add clear button to (int); 2 — in or out (symbol)\n");
	}
}

// removeclearbutton -- remove a clear button for a given slot number & type
function removeclearbutton(val)
{
	if(arguments.length)  // bail if no arguments
	{
		k = arguments[0] - 1; // set k from slot number
		chantype = arguments[1]; // set channel type (in/out)
		scriptingname = modulename + '-' + (k+1) + "-" + chantype + "-slot-clear";
		this.patcher.apply(function(object) {
			if (object.varname == scriptingname) {
				this.patcher.remove(object);
			}
		});
	}
	else // complain about arguments
	{
		error("removeclearbutton message needs arguments:\n1 — number of slot to remove clear button from (int); 2 — in or out (symbol)\n");
	}
}

// inchannum -- clear and rebuild input slots
function inchannum(val)
{
	if(arguments.length)  // bail if no arguments
	{
		// remove existing slots
		clear();
		// build new slots
		buildslots(arguments[0], "in");
	}
	else // complain about arguments
	{
		error("inchannum message needs argument specifying number of channels\n");
	}
}

// outchannum -- clear and rebuild output slots
function outchannum(val)
{
	if(arguments.length) // bail if no arguments
	{
		// remove existing slots
		clear();
		// build new slots
		buildslots(arguments[0], "out");
	}
	else // complain about arguments
	{
		error("outchannum message needs argument specifying number of channels\n");
	}
}

/*
//////   D I C T I O N A R Y   //////
//////      M E T H O D S      //////
*/

// setdict -- adds all slots found in this patcher to the global dictionary
function setdict(val) {
	this.patcher.apply(
		function(object) {
			if (/-in-slot$/.test(object.varname) || /-out-slot$/.test(object.varname)) {
				twoclickDictionary.set(object.varname, 0);
			}
		}
	);
}

// cleardict -- empty the global dictionary
function cleardict() {
	twoclickDictionary.clear();
}

/*
//////     B P A T C H E R     //////
//////      M E T H O D S      //////
*/

// (Abandoned for now)

/* FIRST ATTEMPT (HT LUKE HALL)
function resizebpatcher(val) {
    height = arguments[0]*15 + 30; // set height of [bpatcher] dependent on slots
		post(height, "\n");
    if (this.patcher.box) {
				// get current patcher box
        a = this.patcher.box.rect;
				post(String(rect), "\n");
				// use current position and apply new size
        this.patcher.box.rect = [a[0],a[1],135,height];
				post(String(this.patcher.box.rect), "\n");
    }
		else { post("no patcher box\n"); }
}

   SECOND ATTEMPT (SKETCHING)
function resizebpatcher(val) {
	post("run resize\n");
	if(this.patcher.parentpatcher) {
		post("parent patcher exists\n");
		this.patcher.parentpatcher.apply(function(object) {
			post(object.rect, "\n");
			if (/patcher/.test(object.maxclass)) {
				bpargs = object.getattr("args");
				post("second arg: ", bpargs[1]);
				post("inside loop\n");
			}
		});
	}
	else if(this.patcher) {
		post("patcher exists\n");
	}
	else {
		post("nowt exists?!\n");
	}
}
*/
