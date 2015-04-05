// cs.2click.js
//
// manage 2click in- & output modules globally
//
//

// inlets and outlets
inlets = 1;
outlets = 1;
setinletassist(0, 'inchannum followed by an int between 1 and 8 will create an interface for routing that many input channels; outchannum followed by an int between 1 and 8 will create an interface for routing that many output channels; a clear message will delete all modules');
setoutletassist(0, 'various');

// global variables and arrays
var channum = 0;

// Maxobj variables for scripting
var twoclickObjects = new Array(32);

/*
// methods start here
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
		chantype = arguments[1]; // whether slot is in or out

		// iterate args
		for(k=0;k<channum;k++)
		{
			x = 0; // set object’s x co-ordinate
			y = 15 * (k+1); // set object’s y co-ordinate
			twoclickObjects[4*k+3] = this.patcher.newdefault( x, y, "ubutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot", "@patching_rect", x, y, 105, 15, "@hltcolor", 0.05, 0.97, 0.39, 0.5, "@rounded", 0);
			twoclickObjects[4*k] = this.patcher.newdefault( x, y, "textbutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot-label", "@patching_rect", x, y, 15, 15, "@text", k+1, "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.25, 0.25, 0.25, 1., "@textcolor", 0.96, 0.96, 0.96, 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);
			twoclickObjects[4*k+1] = this.patcher.newdefault( x+15, y, "textbutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot-val", "@patching_rect", x+15, y, 90, 15, "@text", "[empty]", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 0, "@bgcolor", 0.96, 0.96, 0.96, 1., "@textcolor", 0.2, 0.2, 0.2, "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@textoncolor", 0., 0., 0., 1., "@borderoncolor", 0.05, 0.97, 0.39, 1.);
			twoclickObjects[4*k+2] = this.patcher.newdefault( x+105, y, "textbutton", "@varname", "#1-" + (k+1) + "-" + chantype + "-slot-clear", "@patching_rect", x+105, y, 15, 15, "@text", "✖", "@fontname", "Arial", "@fontsize", 10., "@fontface", 1, "@align", 1, "@bgcolor", 0.99, 0.41, 0.43, 1., "@textcolor", 1., 1., 1., 1., "@border", 1, "@rounded", 0, "@bordercolor", 1., 1., 1., 1., "@bgoncolor", 0.05, 0.97, 0.39, 1., "@bgovercolor", 1., 0., 0., 1., "@textovercolor", 0., 0., 0., 0. );
		}

		// done building confirmation out left outlet
		outlet(0, 'done building');

	}

	else // complain about arguments
	{
		error("buildslots message needs arguments:\n1 — number of channels (int); 2 — in or out (symbol)\n");
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
