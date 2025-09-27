{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 8,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 119.0, 118.0, 930.0, 928.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 8.0, 8.0 ],
		"gridsnaponopen" : 2,
		"objectsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 500,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "Global Methods Test for Max 8 JavaScript Environment",
		"digest" : "",
		"tags" : "",
		"style" : "default",
		"subpatcher_template" : "Max Audio Effect_template",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 184.0, 40.0, 40.0 ]
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "js",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 600.0, 184.0, 120.0, 40.0 ],
					"text" : "GlobalMethodsTest.js"
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 240.0, 200.0, 60.0 ],
					"text" : "Global Methods Test\\nClick button to run comprehensive Max 8 JavaScript environment test\\nCheck Max console for detailed output"
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 320.0, 300.0, 80.0 ],
					"text" : "Test Coverage:\\n• Promise polyfill availability\\n• typeof operator behavior\\n• instanceof operator behavior\\n• Object methods (keys, values, entries)\\n• Array methods (map, filter, reduce)\\n• Global methods (parseInt, parseFloat, isNaN, isFinite)\\n• ES5 features (JSON, Date, RegExp)\\n• Max 8 specific features (Task, post, outlet, inlet, etc.)"
				}

			}
		]
,
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"locked" : 0
				}

			}
		]
,
		"parameters" : 	{

		}
,
		"dependency_cache" : [ 			{
				"name" : "GlobalMethodsTest.js",
				"key" : "GlobalMethodsTest.js",
				"file" : "GlobalMethodsTest.js",
				"cached" : 1,
				"path" : "Code/GlobalMethodsTest.js",
				"externals" : [ 				{
						"name" : "GlobalMethodsTest.js",
						"key" : "GlobalMethodsTest.js"
					}
				]
			}
		]
,
		"autosave" : 0,
		"default_apply" : 0,
		"default_visible" : 1,
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 8.0, 8.0 ],
		"gridsnaponopen" : 2,
		"objectsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 500,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "Global Methods Test for Max 8 JavaScript Environment",
		"digest" : "",
		"tags" : "",
		"style" : "default",
		"subpatcher_template" : "Max Audio Effect_template",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 184.0, 40.0, 40.0 ]
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "js",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 600.0, 184.0, 120.0, 40.0 ],
					"text" : "GlobalMethodsTest.js"
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 240.0, 200.0, 60.0 ],
					"text" : "Global Methods Test\\nClick button to run comprehensive Max 8 JavaScript environment test\\nCheck Max console for detailed output"
				}

			}
,
			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 320.0, 300.0, 80.0 ],
					"text" : "Test Coverage:\\n• Promise polyfill availability\\n• typeof operator behavior\\n• instanceof operator behavior\\n• Object methods (keys, values, entries)\\n• Array methods (map, filter, reduce)\\n• Global methods (parseInt, parseFloat, isNaN, isFinite)\\n• ES5 features (JSON, Date, RegExp)\\n• Max 8 specific features (Task, post, outlet, inlet, etc.)"
				}

			}
		]
,
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"locked" : 0
				}

			}
		]
,
		"parameters" : 	{

		}
,
		"dependency_cache" : [ 			{
				"name" : "GlobalMethodsTest.js",
				"key" : "GlobalMethodsTest.js",
				"file" : "GlobalMethodsTest.js",
				"cached" : 1,
				"path" : "Code/GlobalMethodsTest.js",
				"externals" : [ 				{
						"name" : "GlobalMethodsTest.js",
						"key" : "GlobalMethodsTest.js"
					}
				]
			}
		]
,
		"autosave" : 0,
		"default_apply" : 0,
		"default_visible" : 1,
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0
	}

}
