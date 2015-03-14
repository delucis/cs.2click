// ddui.js
//
// automatically generate modules for drag and drop
// from list of module names
//
// each list item name —> textbutton label
//

// inlets and outlets
inlets = 1;
outlets = 1;
setinletassist(0, 'modules followed by list of names will create a draggable module with each name as its label; a clear message will delete all modules');
setoutletassist(0, '(list) pairs of index number and module name');

// global variables and arrays
var modulelist = '';
var modulenum = 0;

// Maxobj variables for scripting
var dduiModules = new Array(32);

/*
// methods start here
*/
// clear -- removes all modules
function clear()
{
	this.patcher.apply(function(object) {
		if (/^ddui-/.test(object.varname)) {
			this.patcher.remove(object);
		}
	});
}

// modules -- generates and binds the track-info modules in the max patch
function modules(val)
{
	clear(); // remove existing modules

	if(arguments.length) // bail if no arguments
	{

		// parse arguments
		modulelist = arguments;
		modulenum = modulelist.length;
		var modulenames = '';

		// iterate args
		for(k=0;k<modulenum;k++)
		{
			x = 165; // set object’s x co-ordinate
			y = 30 * (k+1); // set object’s y co-ordinate
			dduiModules[k] = this.patcher.newdefault(x, y, "textbutton", "@varname", "ddui-" + k, "@patching_rect", x, y, 150, 30, "@text", "⁝" + modulelist[k], "@fontname", "Arial", "@fontsize", 13., "@align", 0, "@bgcolor", 1., 1., 1., 1., "@border", 2, "@rounded", 0, "@bordercolor", 0.94, 0.85, 0.79, 1., "@bgovercolor", 0.82, 0.93, 0.94, 1., "@bgoncolor", 0.98, 0.82, 0.05, 0.8, "@borderoncolor", 0.98, 0.82, 0.05, 0.8);

			// add module name to the modulenames variable (building a string list)
			modulenames = modulenames + k + ' ' + modulelist[k] + ' ';
		}

		// send list of module names out left outlet
		outlet(0, modulenames);

	}

	else // complain about arguments
	{
		post("modules message needs arguments");
		post();
	}
}
