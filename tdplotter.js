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

var debugMap;

Ext.define('tdModel',{
				extend: 'Ext.data.Model',
				fields: [					
					
					    {name: 'colns', type: 'string'}	,
						{name: 'coldeg', type: 'int'}	,
						{name: 'colmin', type: 'int'}	,
						{name: 'colew', type: 'string'}	,
						{name: 'coldist', type: 'float'}
				
				
				]
			});

Ext.define('tdplotter',{
	extend: 'Ext.window.Window',	
	title: 'TD Plotter',
	
	alias: 'widget.tdplotter',
	height: 500,
	width: 600,	
	layout: 'fit',
	
	initComponent: function(){
			
			var myStore= Ext.create('Ext.data.Store', {
			storeId:'tdStore',
			fields:['colns', 'coldeg','colmin', 'colew','coldist'],
			//model: 'tdModel',
			data:[

				 // { 'colns': 'S', "coldeg":10,  "colmin":0,  "colew":"W",  "coldist":20  },
				 // { 'colns': 'N', "coldeg":90,  "colmin":0,  "colew":"E",  "coldist":40  },
				 // { 'colns': 'N', "coldeg":0,  "colmin":0,  "colew":"E",  "coldist":18  },
				 // { 'colns': 'N', "coldeg":90,  "colmin":0,  "colew":"E",  "coldist":18 },
				 // { 'colns': 'S', "coldeg":4,  "colmin":0,  "colew":"W",  "coldist":40 },
				 // { 'colns': 'N', "coldeg":85,  "colmin":0,  "colew":"W",  "coldist":30 },
				 // { 'colns': 'S', "coldeg":2,  "colmin":0,  "colew":"W",  "coldist":5 },
				 // { 'colns': 'N', "coldeg":85,  "colmin":0,  "colew":"W",  "coldist":16 },
				 // { 'colns': 'N', "coldeg":2,  "colmin":0,  "colew":"W",  "coldist":5 },	    
				 // { 'colns': 'N', "coldeg":85,  "colmin":0,  "colew":"W",  "coldist":26 },
				 // { 'colns': 'N', "coldeg":0,  "colmin":0.5,  "colew":"W",  "coldist":35 },
				 // { 'colns': 'N', "coldeg":85,  "colmin":0,  "colew":"E",  "coldist":18 }         
			]
  
			});
			
			var me = this;
			map=me.map;
			
			Ext.apply(me,{
			
					items: 	{
							xtype:'panel', //Main Panel - with 2 child panels
							padding: 10,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [		
								
								{
									xtype: 'panel',
									layout:'hbox',	
									//flex: 1,
									items: [
										{
									
									
											xtype: 'panel',								
											padding: 10,
											itemId: 'panelLat',
											border: false,
											layout: 'hbox',			
											title: 'Latitude (WGS84)',
											items: [{
													
													xtype: 'textfield',
													fieldLabel: 'DD:',
													labelWidth: 25,
													width: 70,
													emptyText: '14',
													margin: 5,
													itemId: 'LatDD'
											
													},
													{
													
													xtype: 'textfield',
													fieldLabel: 'MM:',
													labelWidth: 25,
													width: 70,
													emptyText: '32',
													margin: 5,
													itemId: 'LatMM'
											
													},
													{
													
													xtype: 'textfield',
													fieldLabel: 'SS:',
													labelWidth: 25,
													width: 90,
													emptyText: '8.12',
													margin: 5,
													itemId: 'LatSS'
											
													}
											],
											tools:[{
												type:'gear',
												
												handler:function(){
												var me = this.up('tdplotter'); 
													Ext.Msg.prompt('Latitude', 'Decimal Degrees:', function(btn, text){
														if (btn == 'ok'){
															var dd =parseFloat(text);
															if(dd!='NaN')
															{
																
																 var deg = dd | 0; // truncate dd to get degrees
																var frac = Math.abs(dd - deg); // get fractional part
																var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
																var sec = frac * 3600 - min * 60;
																
																me.down('#LatDD').setValue(deg)
																me.down('#LatMM').setValue(min)
																me.down('#LatSS').setValue(sec)
																
															}
														}
													});
												}
											
											}]
											
										},
										{
											xtype: 'panel',		
											padding: 10,
											itemId: 'panelLong',
											border: false,	
											layout: 'hbox',	
											//flex: 1,	
											title: 'Longitude (WGS84)',
											items: [
													{
													xtype: 'textfield',
													fieldLabel: 'DD:',
													labelWidth: 25,
													width: 70,
													emptyText: '121',
													margin: 5,
													itemId: 'LongDD'
											
													},
													{
													
													xtype: 'textfield',
													fieldLabel: 'MM:',
													labelWidth: 25,
													width: 70,
													emptyText: '2',
													margin: 5,
													itemId: 'LongMM'
											
													},
													{
													
													xtype: 'textfield',
													fieldLabel: 'SS:',
													labelWidth: 25,
													width: 90,
													emptyText: '27.67',
													margin: 5,
													itemId: 'LongSS'
											
													}
											],
											tools:[{
												type:'gear',
												
												handler:function(){
												var me = this.up('tdplotter'); 
													Ext.Msg.prompt('Longitude', 'Decimal Degrees:', function(btn, text){
														if (btn == 'ok'){
															var dd =parseFloat(text);
															if(dd!='NaN')
															{
																
																 var deg = dd | 0; // truncate dd to get degrees
																var frac = Math.abs(dd - deg); // get fractional part
																var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
																var sec = frac * 3600 - min * 60;
																
																me.down('#LongDD').setValue(deg)
																me.down('#LongMM').setValue(min)
																me.down('#LongSS').setValue(sec)
																
															}
														}
													});
												}
											
											}]
											
										
										} 
											
											
											]
									
									
											},
										
								{
								
									xtype: 'panel',			
										
									//width: 300,
									//autoScroll: true,
									flex: 1,
									border: false,
									layout: 'fit',
									
									items: [
									
											
											{
												xtype: 'grid',
												title: 'Technical Description',	
												store: Ext.data.StoreManager.lookup('tdStore'),
												plugins: [
													Ext.create('Ext.grid.plugin.CellEditing', {
														clicksToEdit: 1
													})
												],
												dockedItems:[ {
																xtype: 'toolbar',
																dock: 'bottom',
																items:[{xtype:'tbfill'},
																	{ xtype: 'button',
																	  text: 'Add Bearing/Distance',
																	  handler: function()
																	  {
																		var rec = new tdModel({
																			colns: 'N',
																			coldeg: 0,
																			colmin: 0,
																			colew: 'E',
																			coldist: 0
																		
																		
																		
																		});
																		//tdEditor.stopEditing();
																		//console.log(this);
																		this.up('grid').store.insert(this.up('grid').store.getCount(),rec);
																		//grid.getView().refresh();
																		//grid.getSelectionModel().selectedRow(0);
																		//editor.startEditing(0); /
																		
																	  }
																		
																	
																	}]
																	
															
															}],
												//height: '100% 100%',
												//store: myStore,
												
												
												
												columns: [
													{ 
													text: 'NS',  
													dataIndex: 'colns' ,
													editor: new Ext.form.field.ComboBox({
														
														editable: false,
														triggerAction: 'all',
														store: [
															['N','N'],
															['S','S']
															
														]
														})
													},
													
													
													
													{ 
													text: 'Deg', 
													dataIndex: 'coldeg',
													editor: {
															xtype: 'numberfield',
															allowBlank: false,
															minValue: 0,
															maxValue: 90,
															allowDecimals: false
														}
													},
													
													{ 
													text: 'Min', 
													dataIndex: 'colmin',
													editor: {
															xtype: 'numberfield',
															allowBlank: false,
															minValue: 0,
															maxValue: 60,
															allowDecimals: false
														}
													},
													
													
													
													
												
													{ 
													text: 'EW',  
													dataIndex: 'colew' ,
													editor: new Ext.form.field.ComboBox({
														
														editable: false,
														triggerAction: 'all',
														store: [
															['E','E'],
															['W','W']
															
														]
														})
													},
													
													
													{ 
													text: 'Distance m.', 
													dataIndex: 'coldist',
													flex: 1,
													editor: {
															xtype: 'numberfield',
															allowBlank: false,
															minValue: 0,															
															allowDecimals: true
														}
													},
													
													
													{
													xtype: 'actioncolumn',
													width: 30,
													sortable: false,
													menuDisabled: true,
													items: [{
														icon: 'Delete.gif',
														tooltip: 'Delete row',
														
														handler: function(grid,rowIndex)
														{
															this.up('grid').store.removeAt(rowIndex);
														}
													}]
												}
												
												]
									
											} 
									]
									
										
								} 
								
								
								],
							buttons: [
								
																
								
								
								{
									text:'Plot',
									handler: function()							
									{
									
									var me = this.up('tdplotter'); 
									
									//delete vector layer if exist
									me.map.getLayers().forEach(function (lyr) {
									if (lyr.get('name') =='layerVector')
										{
											me.map.removeLayer(lyr);
										}
									});									
								
									
									var latdeg = parseInt(me.down('#LatDD').getValue());
									var latmin = parseInt(me.down('#LatMM').getValue());
									var latsec = parseInt(me.down('#LatSS').getValue());
									var latdd= latdeg + (latmin/60) + (latsec/3600);
									var longdeg = parseInt(me.down('#LongDD').getValue());
									var longmin = parseInt(me.down('#LongMM').getValue());
									var longsec = parseInt(me.down('#LongSS').getValue());
									var longdd= longdeg + (longmin/60) + (longsec/3600);									
									
									if(isNaN(longdd) || isNaN(latdd))
									{
										alert("Longitude/Latitude is required");
										return;
									}
									
									var p = new ol.geom.Point([longdd,latdd]).transform("EPSG:4326","EPSG:900913");
									var lineString = new ol.geom.LineString([]);
									var multipoints = new ol.geom.MultiPoint([]);
									lineString.appendCoordinate(p.getCoordinates());
									var prevPoint = p;
									
									//iterate through grid 
									myStore.each(function(row) {
									   
											   var heading = row.get('colns');
											   var d = row.get('coldeg');
											   var m = row.get('colmin');
											   var bearing = row.get('colew');
											   var dist = row.get('coldist');
											   
											   var newPoint = tdToPoint(prevPoint.getCoordinates(),heading,d,m,bearing,dist)
											   lineString.appendCoordinate(newPoint.getCoordinates());		
											multipoints	.appendPoint(newPoint);		
																				   										   
											   prevPoint=newPoint;									   
									})
									
									var source = new ol.source.Vector({
										features: [new ol.Feature(lineString),new ol.Feature(multipoints)],
										projection: 'EPSG:900913'
									});
									
								   layer = new ol.layer.Vector({
										source: source,
										name:'layerVector'
										//style: vectorStyle
										});
										
										
									me.map.addLayer(layer);
									
									//zoom to vector features
									var extent = layer.getSource().getExtent();
							        me.map.getView().fitExtent(extent, me.map.getSize());
									
									// me.map.addLayer(vectorLayer);
									 var window = this.up('window');
									 window.collapse();
									 window.setWidth(350);
									window.alignTo(Ext.getBody(), 'bl-bl')	
									}
								}
								
							]
						
						
						
						
						}
				
			});
			
		
			
			this.callParent();
		
	},
		
		
	
	
	
	
	listeners: {
            close: function () {
			
				map.getLayers().forEach(function (lyr) {
					if (lyr.get('name') =='layerVector')
					{
						map.removeLayer(lyr);
					}
				});									
            }
	},
		
		tools: [{
            type: 'restore',
            handler: function (evt, toolEl, owner, tool) {
                var window = owner.up('window');
                window.setWidth(600);
                window.expand('', false);
                window.center();
            }
        },
		{
            type: 'minimize',
            handler: function (evt, toolEl, owner, tool) {
			var window = owner.up('window');
                window.collapse();
                window.setWidth(350);
                window.alignTo(Ext.getBody(), 'bl-bl')
            }
        }
		
		],
	
	
	


});


function tdToPoint(coordinate,heading,degree,minutes,bearing,distance)
{


	
	var deg2rad = Math.PI / 180;
	var azimuth = degree + (minutes / 60);
	
	
	ns=heading.toUpperCase();
	ew=bearing.toUpperCase();
	
	if(ns=='N' && ew=='E')
		{
			//azimuth=0 +azimuth;
		}
		
	else if(ns=='N' && ew=='W')
		{						
			azimuth=0 - azimuth;
		}
	else if(ns=='S' && ew=='E')
		{						
			azimuth=180 - azimuth;
		}	
	else if(ns=='S' && ew=='W')
		{						
			azimuth=180 + azimuth;
		}

			
	
	azimuth = azimuth * deg2rad;
	
	
	var endX = coordinate[0] + Math.sin(azimuth) * distance;
	var endY = coordinate[1]+ Math.cos(azimuth) * distance;

	var p = new ol.geom.Point([endX,endY]);
	return p;
	
	
}
