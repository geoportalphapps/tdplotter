/*
This file is part of PG TD-Plotter

Copyright (c) 2013 National Mapping and Resource Information Authority

PG TD-Plotter is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

PG TD-Plotter is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with PG TD-Plotter.  If not, see <http://www.gnu.org/licenses/>.
*/

Ext.require('tdplotter');	
 
 
 var x;
 var filename ="map.png";
var geoportalUrl='http://v2.geoportal.gov.ph/tiles/v2/PGP/{z}/{x}/{y}.png';
var orthourl='http://v2.geoportal.gov.ph/tiles/v2/Orthoimage/{z}/{x}/{y}.png';
var OrthoExtent = ol.proj.transformExtent([120.613472,14.295979, 121.550385,14.827789],'EPSG:4326','EPSG:900913');
 var geoportalLayer = new ol.layer.Tile({
    extent: [-20037508.34,-20037508.34,20037508.34,20037508.34],
    source: new ol.source.XYZ({
      url: geoportalUrl,
	 crossOrigin: 'anonymous'
    })
  });
 
var osmLayer = new ol.layer.Tile({
	 source: new ol.source.OSM({
						url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                       
					   })
});
  
var bingLayer = new ol.layer.Tile({
	 source: new ol.source.BingMaps({
                         key: 'BING_KEY',
						  imagerySet: 'Road'

					   })
});

var arcgisLayer = new ol.layer.Tile({
// extent: [-13884991, 2870341, -7455066, 6338219],
	 source: new ol.source.TileArcGISRest({
                      // url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +    'Specialty/ESRI_StateCityHighway_USA/MapServer',
						url:' http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
						crossOrigin: 'anonymous'
					   })
});



 var ortho = new ol.layer.Tile({
    extent:[-20037508.34,-20037508.34,20037508.34,20037508.34],
    source: new ol.source.XYZ({
      url: orthourl	,
	 crossOrigin: 'anonymous'
    })
  });
 
  
  var items=[];	
		
			
		items.push(
			'->'
			,
			{
				//xtype:'label',
				
				xtype:'tbtext',
				text: 'Basemap: NAMRIA Basemaps'
				
			},
			'->',
			{
				text: 'Basemap',
				id: 'btnBasemap',				
				icon: 'layers.png',
				scale: 'large',
				width: 170, 
				height: 35,
				tooltip: 'Switch basemap',
				menu     : [
					{
						text: 'Philippine Geoportal',
						group: 'basemap',
						checked: true,
						handler: function(){
							x.getLayers().removeAt(0);
							x.getLayers().insertAt(0,geoportalLayer);
							this.up().up().up().items.items[1].setText('Basemap : ' + this.text);

						}
					},
					{
						text: 'Ortho Image 2011 (selected areas)',
						disable: true,
						group: 'basemap',
						checked: false,
						handler: function(){
							x.getLayers().removeAt(0);
							x.getLayers().insertAt(0,ortho);
							this.up().up().up().items.items[1].setText('Basemap : ' + this.text);
							
							//--added by fat 4Sept2015
							//var OrthoExtent = ol.proj.transformExtent([120.613472,14.295979, 121.550385,14.827789],'EPSG:4326','EPSG:900913');
							//x.getView().fitExtent(OrthoExtent,x.getSize());
							//--
							
							//var textent = ol.proj.transformExtent([6, 43, 16, 50], 'EPSG:4326', 'EPSG:3857');
							
							// var center = ol.proj.transform([121, 14], 'EPSG:4326', 'EPSG:3857');
							// var view = new ol.View({	
							// center:center,	
							// zoom: 9
							// });
							
							// x.setView(view);
						}
					},
					{
						text: 'Bing Maps - Aerial',
						disable: true,
						group: 'basemap',
						checked: false,
						handler: function(){
							x.getLayers().removeAt(0);
							x.getLayers().insertAt(0,bingLayer);
							this.up().up().up().items.items[1].setText('Basemap : ' + this.text);
						}
					},
					{
						text: 'ArcGIS Online - Aerial',
						disable: true,
						group: 'basemap',
						checked: false,
						handler: function(){
							x.getLayers().removeAt(0);
							x.getLayers().insertAt(0,arcgisLayer);
							this.up().up().up().items.items[1].setText('Basemap : ' + this.text);
						}
					},
					{
						text: 'Open Street Map',
						group: 'basemap',
						checked: false,
						handler: function(){
							//x.setLayerGroup(osm);
							x.getLayers().removeAt(0);
							x.getLayers().insertAt(0,osmLayer);
							this.up().up().up().items.items[1].setText('Basemap : ' + this.text);
						}
					 }
					 
					 //,
					// {
						// text: 'Google Map - Satellite',
						// group: 'basemap',
						// checked: false,
						// handler: function(){
							// debugMap.setBaseLayer(google_satellite);
						// }
					// }
			   ]
			}
		); 
  

 
Ext.application({
    name: 'OL3EXT4',
    launch: function () {
	 
        var mappanel = Ext.create('Ext.panel.Panel', {
			
			dockedItems: [
				{ xtype: 'toolbar',
				  dock: 'top',
				  items:items
				}
			],		
			
			
			buttons: [
					{
					text: 'Plot TD',
					handler: function(){
					var ppanel = this.up('panel');
					
					var tdwindow = Ext.getCmp('tdwindow');
					
					if(!tdwindow)
						{
							Ext.create('tdplotter',{					
								map:ppanel.map,
								id:'tdwindow'
							
							}
							).show();
					
						}
				
				       } 
			},
								
			{
				 xtype: 'component',
				autoEl: {
						
							
					
  html:"<a id='export-png' download='" + filename + "' ><button  class='btn'>Save As Image</button></a>"
}
					
				
				}			
			],
		
            title: "TD Plotter",
             html: "<div id='map'></div>", // The map will be drawn inside
            listeners: {
                afterrender: function () {
                   
					
					var center = ol.proj.transform([121, 14], 'EPSG:4326', 'EPSG:3857');
					var view = new ol.View({
							center: center,
							maxZoom:20,
							minZoom:6,
							zoom: 6
					});
 
                    this.map = new ol.Map({
                        target: 'map',
                        renderer: 'canvas',
                        layers: [geoportalLayer],
                        view: view
                    });
					x=this.map;
					
                },
                // The resize handle is necessary to set the map!
                resize: function () {
                    var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
                    //console.log(size);
                    this.map.setSize(size);
                }
            }
        });
		
		window.onload = function(){
		//console.log(x);
		
		var exportPNGElement = document.getElementById('export-png');
		//var exportPNGElement =Ext.get('export-png');
		console.log(exportPNGElement);
		
			exportPNGElement.addEventListener('click', function(e) {
			
			x.once('postcompose', function(event) {	
			var canvas = event.context.canvas;
			exportPNGElement.href = canvas.toDataURL('image/jpg',0.1);
			console.log(canvas.toDataURL('image/jpg',0.1).length);
			});
			x.renderSync();
			}, false);
		};
		
			
		
		
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                mappanel
            ]
        });
    }
});



