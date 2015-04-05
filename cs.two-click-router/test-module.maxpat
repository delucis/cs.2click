{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 1,
			"revision" : 9,
			"architecture" : "x86"
		}
,
		"rect" : [ 0.0, 69.0, 479.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Helvetica Neue",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Helvetica Neue",
					"fontsize" : 12.0,
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 4,
					"outlettype" : [ "dictionary", "", "", "" ],
					"patching_rect" : [ 165.0, 15.0, 154.0, 20.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"parameter_enable" : 0
					}
,
					"text" : "dict cs.2click-routing-pairs"
				}

			}
, 			{
				"box" : 				{
					"args" : [ "burp-mod", 4 ],
					"id" : "obj-6",
					"maxclass" : "bpatcher",
					"name" : "cs.2click-inputs.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 15.0, 15.0, 120.0, 75.0 ]
				}

			}
, 			{
				"box" : 				{
					"args" : [ "barf-mod", 6 ],
					"id" : "obj-5",
					"maxclass" : "bpatcher",
					"name" : "cs.2click-outputs.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 15.0, 120.0, 120.0, 165.0 ]
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "cs.2click-outputs.maxpat",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "cs.2click.js",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "cs.2click-inputs.maxpat",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "JSON",
				"implicit" : 1
			}
 ]
	}

}
