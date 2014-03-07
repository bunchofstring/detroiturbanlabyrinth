Ext.define('DUL.Statics', {
	singleton:true,
	
	//For convenient reuse
	DUL_LOGO_SRC: 'resources/images/logo_dul_transparentbackground.png',
	DUL_ADDRESS_SRC: 'resources/images/edmundandbrush.png',
	DUL_TICKET_TOP_BORDER_SRC: 'resources/images/skylineedge.png', //http://3.bp.blogspot.com/-yod6uaeabT4/TpLRa9hMhOI/AAAAAAAAAH0/hEXbO1txczc/s1600/Detroit-Skyline-CCSD-Colorized-stock2204.jpg
	MAP_NAVIGATION_URI: 'TODO: populate geo "intent"',
	FACEBOOK_ACCESS_TOKEN: 'CAACEdEose0cBAMdBbv4dWzH5XgP03gpHIEJ6PIOpSR5GTkZC4gBy2AywoC2ySy1hE6AfpWyYyrVq5CGF00N4J6gjgpj7ZAuZBGMZASeMniSyB1QLI4OmzfZBxREaIzimLN2LoP1e3wbsKle23KoXAyHykIQii7ApAtQsNalmyMQaE43QS7ShIy5lqNxVnRP4ZD',
	FACEBOOK_FEED: 'https://www.facebook.com/feeds/page.php?format=json&id=535662589827580'
	//FACEBOOK_FEED: 'https://graph.facebook.com/535662589827580/feed?method=GET&format=json&suppress_http_code=1&fields=message,from,picture&access_token='//'https://www.facebook.com/feeds/page.php?format=json&id=535662589827580'
});

Ext.define('DUL.view.Main', {
    extend: 'Ext.Carousel',
    xtype: 'main',
    id: 'main',
    config: {
    	items: [
            {
            	id: 'introduction',
            	
            	//Config in common with the Check In screen
            	scrollable: (false) ? true : {
					direction: 'vertical',
					directionLock: true
				},
            	
                items: [
                	{
                		cls: 'papertexture boxshadow roundedcorners',
                		items: [
							{
								top: 0,
								
								//Not even exactly sure how this works, but it does and it scales and positions perfectly on Chrome (desktop)
								width: '125%',
								margin: '-41.5% -12.5%',
								zIndex: -5,
								
								//Image element sizes the box, but the parent element's background is actually visible
								html: '<img width="100%" style="visibility:hidden" src="'+DUL.Statics.DUL_TICKET_TOP_BORDER_SRC+'">',
								style: 'background-image:url("'+DUL.Statics.DUL_TICKET_TOP_BORDER_SRC+'"); background-size:contain; background-repeat:no-repeat'
							},
							{
								xtype: 'button',
								id: 'checkinmarker',
								ui: 'plain',
								top: '-29%',
								left: '50%',
								width: '26%',
								height: '30%',
								margin: '0 0 0 -13.2%',
								zIndex: 10,
								handler: function(){Ext.Viewport.down('main').next();}
							},
							{
								//Closes small gap between siblings and facilitates ragged top edge
								//Image element sizes the box, but the parent element's background is actually visible
								html: '<img width="100%" style="visibility:hidden" src="'+DUL.Statics.DUL_LOGO_SRC+'">',
								style: 'background-image:url("'+DUL.Statics.DUL_LOGO_SRC+'"); background-size:100%; background-position: 50% 100%; background-repeat: no-repeat; margin: 0 0.8em;'
							},
							{
								//Image element sizes the box, but the parent element's background is actually visible
								html: '<img width="100%" style="visibility:hidden" src="'+DUL.Statics.DUL_ADDRESS_SRC+'">',
								style: 'background-image:url("'+DUL.Statics.DUL_ADDRESS_SRC+'"); background-size:100%; background-position: 50%; background-repeat: no-repeat; margin: 0 0.8em; padding:0.1em 0; border-width: 2px 0; border-style:solid'
							},
							{
								html: [
									'In its heyday (mid-1800\'s), Brush Park was full of vibrance and promise. The Detroit Urban Labyrinth project at <a href="'+DUL.Statics.MAP_NAVIGATION_URI+'">Edmund and Brush St.</a>, aims to restore that promise in some small way and rekindle a sense of pride.',
									'This is what happens when a handful of people decide to take charge and make a positive impact on Detroit - a city we love, admire, believe in, and encourage.',
									'The supporters listed below enjoyed creating something beautiful here; but the Motor City still needs a lot of TLC and we hope you feel inspired to pitch in and be a part of something bigger than yourself.'
								].join('<br><br>'),
								padding: '1.5em 1.5em 1.5em'
							}
						]
					}
                ]
            },
            
            /*{
				id:'topbarcheckin',
				docked:'top',
				top:0,
				
				//Appearance
				width: '100%',
				height: '4em',
				//height: see app.scss
				hidden:true,
				layout: 'hbox',
				
				//Child items
				defaults: {
					xtype: 'button',
					ui: 'plain',
					flex: 1
				},
				items: [
					{
						id: 'facebooklogo',
						handler:function(){console.log('recieving fine');}
					},
					{
						id: 'foursquarelogo'
					}
				]
			},*/
            {
				docked:'top',
				id:'topbarcheckinwrapper',
				//top:0,
				style:'background:url("resources/images/shadowgradient.png"); background-size:contain%; background-repeat: repeat-x; background-position:0 -3em;',
				
				//Appearance
				width: '100%',
				items: [
					{
						id:'topbarcheckin',
						
						showAnimation:{type:'slideIn',direction:'down',duration:100},
						hideAnimation:{type:'slideOut',direction:'up',duration:50},
						
						//Appearance
						width: '100%',
						height: '4em',
						hidden:true,
						layout: 'hbox',
						
						//Child items
						defaults: {
							xtype: 'button',
							ui: 'plain',
							flex: 1
						},
						items: [
							{
								id: 'facebooklogo',
								handler:function(){alert('Book of faces!');}
							},
							{
								id: 'foursquarelogo',
								handler:function(){alert('Check in!');}
							}
						]
					},
				]
			},
            {
            	id: 'checkinlist',
            	layout: 'vbox',
            	
            	//Config in common with the Introduction screen
            	scrollable: {
					direction: 'vertical',
					directionLock: true
				},
				
				listeners: {
					activate:function(){Ext.Viewport.down('#topbarcheckin').show();},
					deactivate:function(){Ext.Viewport.down('#topbarcheckin').hide();}
				},

				items: [
					
					{
						xtype: 'list',
						store: 'Signal',
						itemCls: 'boxshadow roundedcorners',
						pressedCls: false,
						disableSelection: true,
						height:'2000em',
						
						scrollable: false,
						
						itemTpl: [
							'<div style="line-height:1.3em; margin-bottom:0.5em">',
								'<div><span style="font-weight:bold">{author}</span> via <a href="{alternate}">Facebook</a></div>',
								'<div style="color:#ccc; font-size:0.9em">{time:date("M j, Y @ g:ia")}</div>',
							'</div>',
							'{content}'
						]
					}
				]
            }
        ]
    }
});

Ext.define("DUL.model.Signal", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "author", type: "string", mapping: 'author.name'},
            {name: "alternate", type: "string"},
            {name: "content", type: "string", convert:function(data,record){
            	return (record.raw.content || '')
            		.replace(/onmouseover=".*?"/g,'')
            		.replace(/onclick=".*?"/g,'')
            		.replace(/style=".*?"/g,'')
            		.replace(/<br\/><br\/><a/g,'<br/><a style="display:block;margin-top:0.8em"');
            }},
            {name: "time", type: "string", convert: function(data,record){
            	return record.raw.published || record.raw.updated;
            }},
            {name: "updated_time", type: "string"},
            {name: "picture", type: "string"}
        ]
    }
});

Ext.create("Ext.data.Store", {
    storeId: "Signal",
    model: "DUL.model.Signal",
	proxy: {
		type: "ajax",
		url : DUL.Statics.FACEBOOK_FEED,//+DUL.Statics.FACEBOOK_ACCESS_TOKEN,
		reader: {
			type: "json",
			rootProperty: "entries"
		}
	},
	autoLoad: true,
	filters: [
		{
			filterFn:function(record){
				//console.log(arguments);
				return record.raw.content.length > 66;
			}
		}
	]
});
