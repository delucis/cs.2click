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

// global variables and arrays
var modulelist = '';
var modulenum = 0;

// Maxobj variables for scripting
var dduiModules = new Array(32);

/*
// methods start here
*/
// tracks -- generates and binds the track-info modules in the max patch
function modules(val)
{
	this.patcher.apply(function(object) {
		if (/^ddui-/.test(object.varname)) {
			// With thanks to Josiah Wolf Oberholtzer for clarifying this
			this.patcher.remove(object);
		}
	});

	if(arguments.length) // bail if no arguments
	{
		
		// parse arguments
		a = arguments;
		modulenum = a.length;
		modulelist = a;
		
		// print number of modules
		post(modulenum);
		post();
		
		// iterate args
		for(k=0;k<modulenum;k++)
		{
			// print module names one by one
			post(modulelist[k]);
			post();
			
			x = 165; // set object’s x co-ordinate
			y = 30 * (k+1); // set object’s y co-ordinate
			dduiModules[k] = this.patcher.newdefault(x, y, "textbutton", "@varname", "ddui-" + k, "@patching_rect", x, y, 150, 30, "@text", "⁝" + modulelist[k], "@fontname", "Arial", "@fontsize", 13., "@align", 0, "@bgcolor", 1., 1., 1., 1., "@border", 2, "@rounded", 0, "@bordercolor", 0.94, 0.85, 0.79, 1., "@bgovercolor", 0.82, 0.93, 0.94, 1., "@bgoncolor", 0.98, 0.82, 0.05, 0.8, "@borderoncolor", 0.98, 0.82, 0.05, 0.8);
		}
		
		/*
		// safety check for number of tracks
		if(a<0) a = 0; // too few tracks, set to 0
		if(a>32) a = 32; // too many tracks, set to 32
		*/
	}

	else // complain about arguments
	{
		post("tracks message needs arguments");
		post();
	}
}