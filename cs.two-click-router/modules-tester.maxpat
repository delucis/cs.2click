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
					"id" : "obj-7",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 15.0, 345.0, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"channels" : 1,
					"id" : "obj-4",
					"maxclass" : "live.gain~",
					"numinlets" : 1,
					"numoutlets" : 4,
					"orientation" : 1,
					"outlettype" : [ "signal", "", "float", "list" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 15.0, 45.0, 120.0, 31.0 ],
					"presentation_rect" : [ 0.0, 0.0, 0.0, 31.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "live.gain~",
							"parameter_shortname" : "live.gain~",
							"parameter_type" : 0,
							"parameter_mmin" : -70.0,
							"parameter_mmax" : 6.0,
							"parameter_initial" : [ 0.0 ],
							"parameter_unitstyle" : 4
						}

					}
,
					"showname" : 0,
					"varname" : "live.gain~"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Helvetica Neue",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 15.0, 15.0, 69.0, 20.0 ],
					"text" : "cycle~ 440"
				}

			}
, 			{
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
					"args" : [ "burp-mod", 2 ],
					"id" : "obj-6",
					"maxclass" : "bpatcher",
					"name" : "cs.2click-inputs.maxpat",
					"numinlets" : 0,
					"numoutlets" : 8,
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 15.0, 240.0, 120.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"args" : [ "barf-mod", 6 ],
					"id" : "obj-5",
					"maxclass" : "bpatcher",
					"name" : "cs.2click-outputs.maxpat",
					"numinlets" : 8,
					"numoutlets" : 0,
					"patching_rect" : [ 15.0, 105.0, 120.0, 105.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 7 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 6 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 5 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-4" : [ "live.gain~", "live.gain~", 0 ]
		}
,
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
				"name" : "cs.2click-send~.maxpat",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "cs.2click-inputs.maxpat",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "cs.2click-receive~.maxpat",
				"bootpath" : "/Users/chris/Desktop/desktop/Max/music264-spring-2015/students/chris-swithinbank/cs.two-click-router/lib",
				"patcherrelativepath" : "./lib",
				"type" : "JSON",
				"implicit" : 1
			}
 ]
	}

}
