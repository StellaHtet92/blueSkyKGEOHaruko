var map = L.map('map').setView([18.7883, 98.9853], 7);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 6,
        maxZoom: 9
    }).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var baseMaps={
    'OpenLayer Map':osm,
    'Esri World Imagery':Esri_WorldImagery,
    'Google Streets':googleStreets,
    'Google Satellite':googleSat

};

/*to show up distrcit name on mouse click
var thaLayer = L.geoJSON(tha_adm, {
    onEachFeature: function (feature, layer) {
    layer.bindPopup('<h6>' + feature.properties.NAME_1 + '</h><p>name: ' + feature.properties.NAME_1 + '</p>');
    },
    style:{
        color:'transparent',
        fillColor:'white',
        fillOpacity:'0.1'
    }
}).addTo(map);*/
/* to show up distrcit name without user's mouse interaction
var thaLayer = L.geoJSON(tha_adm, {
    onEachFeature: function (feature, layer) {
    layer.bindTooltip('<h6>' + feature.properties.NAME_1 + '</h6>',{permanent: true, direction: "center", className: "my-labels", opacity: 0.7}).openTooltip();
    },
    style:{
        color:'transparent',
        fillColor:'white',
        fillOpacity:'0.1'
        
    }
}).addTo(map);*/
/* to show up distrcit name without user's mouse interaction (open all the time)
var thaLayer = L.geoJSON(tha_adm, {
    onEachFeature: function (feature, layer) {
    layer.bindTooltip('<h6>' + feature.properties.NAME_1 + '</h6>',{permanent: true, direction: "center"}).openTooltip();
    },
    style:{
        color:'transparent',
        fillColor:'white',
        fillOpacity:'0.1'
        
    }
}).addTo(map);*/
var thaLayer = L.geoJSON(tha_adm, {
    onEachFeature: function (feature, layer) {
    layer.bindTooltip('<h6>' + feature.properties.NAME_1 + '</h6>').openTooltip();
    },
    style:{
        color:'transparent',
        fillColor:'white',
        fillOpacity:'0.1',
        permanent: true,
        direction: 'center'
    }
}).addTo(map);
/*to show up district name without user interaction not working version
var markers = L.markerClusterGroup();

L.geoJSON(tha_adm, {
    pointToLayer: function(feature,latlng){
      label = String(feature.properties.NAME_1) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
      return markers.addLayer(new L.CircleMarker(latlng, {
        radius: 1,
      })).bindTooltip(label, {permanent: true,direction: "center",
      className: "my-labels", opacity: 0.7}).openTooltip();
      }
    }).addTo(map);
 map.addLayer(markers);*/

//opacity control function
    $('.opacity').on('change',function()
    {
        var val=$(this).val();
        var opacity=val/100;
        //console.log(opacity);

       thaLayer.setStyle({fillOpacity:opacity,opacity: opacity});
    });
//adding wms layer from geoserver
var Burirum_Suitable_Layer=L.tileLayer.wms('http://localhost:8085/geoserver/wms?',{
    layers:'Burirum_Suitable',
    transparent:'true',
    format:'image/png'
});
//function to handle layer
function handleLayer(layerName)
{
    //var layer=L.tileLayer.wms('http://localhost:8085/geoserver/wms?',{
    var layer=L.tileLayer.betterWms('http://localhost:8085/geoserver/wms?',{
    layers:layerName,
    transparent:'true',
    format:'image/png'
})
layer.setOpacity(0.5);
return layer;
}
//handleLayer("geoapp2:24_12.img").addTo(map);
basemapsFromGeoserver.map(layer=>{
    $('.left-sidebar-basemap').append(
        layerCardGenerator02(layer.layerTitle,layer.layerName,layer.defaultCheck)
    );
});
layersFromGeoserver.map(layer=>{
    $('.left-sidebar').append(
        layerCardGenerator02(layer.layerTitle,layer.layerName,layer.defaultCheck)
    );
});
//layer on/off switch for Suitable Area and Standard Precipitation Index
$('.layer-card-cb').on('change',function()
{
    var layerName=$(this).attr('id');
    var layerTitle=$(this).attr('name');
    console.log({layerName,layerTitle});
    if($(this).is(':checked'))
        {
            window[layerName]=handleLayer(layerName).addTo(map);
            //console.log("This is inside check");
            if(layerName !== "geoapp2:Burirum_Suitable")
            {
                //console.log("This is inside check of layerName !== Burirum_Suitable");
                $('.legend').append(wmsLegendControl(layerTitle,layerName));
            }
            else
            {
                //console.log("This is else check of layerName !== blueSky:Burirum_Suitable");
                var legend=`<div id=legend_${layerName}><p class=${layerName} style='margin-top:10px;font-weight:bold;'>${layerTitle}</p>`;
                legend+=`<p><img class=${layerName} src="static/images/burrium_sutiable_map_legend.png" /><br class=${layerName} /></p></div>`;
                $('.legend').append(legend);
            }
        }
    else{
        console.log("This is else check");
        map.eachLayer(function(layer)
            {
                console.log(layer);
                if(layer.options.layers===layerName)
                {
                    map.removeLayer(layer);
                    
                }
              
             
            });
            console.log("before empty the legend");
            var toDelete=document.getElementById(`legend_${layerName}`);
            console.log("Var toDelete");
            console.log(toDelete);
            //$(`.legend p #${layerName}`).empty();
           // $(`.legend p #${layerName}`).remove();
            toDelete.innerHTML='';
            console.log('toDelete.innerHTML=');
    }

})
//for base map layercard
$('.layer-card-cb-baseMaps').on('change',function()
{
    var layerName=$(this).attr('id');
    var layerTitle=$(this).attr('name');
    console.log({layerName,layerTitle});
    if($(this).is(':checked'))
        {
           // window[layerName]=handleLayer(layerName).addTo(map);
            if(layerName === "Esri_WorldImagery")
            {
                Esri_WorldImagery.addTo(map);
            }
            else if(layerName === "googleStreets")
            {
                googleStreets.addTo(map);
            } 
         /*   else if(layerName === "Burirum_Suitable")
            {
                Burirum_Suitable_Layer.addTo(map);
            } */
            else
            {
                googleSat.addTo(map);
            }
            map.eachLayer(function(layer){
               // console.log("Inside for loop of adding basemaps");
                
                if(layer.options.layers != null)
                {
                    console.log("layer.options.layers");
                    console.log(layer.options.layers);
                    handleLayer(layer.options.layers).addTo(map);
                }
            });
        }
    else{
        console.log("This is else check from layer-card-cb-baseMaps");
        map.eachLayer(function(layer)
            {
              //  console.log(layer);
                /*if(layer.options.layers===layerName)
                {
                    map.removeLayer(layer);
                }*/
                if(layerName === "Esri_WorldImagery")
                {
                    map.removeLayer(Esri_WorldImagery);
                   
                }
                else if(layerName === "googleStreets")
                {
                    map.removeLayer(googleStreets);
                } 
                else
                {
                    map.removeLayer(googleSat);
                }
            });
    }

})
 //opacity control
 $('.opacity').on('change',function()
 {
     var layerName=$(this).attr('code');
     var opacity=$(this).val();
     console.log(layerName);
     map.eachLayer(function(layer){
       
         if(layer.options.layers === layerName)
         {
             console.log('Inside to reduce opacity');
             
             layer.setOpacity(opacity/100);
         }
        else{
            console.log('layer.options')
            console.log(layer.options)
            console.log('layer.options.layers')
            console.log(layer.options.layers)
        }
     })
 });
  //legend control function
  function wmsLegendControl(layerTitle,layerName)
  {
    var url=`http://localhost:8085/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&layer=${layerName}`;
    console.log(url);
    var legend=`<div  id=legend_${layerName}><p class=${layerName} style='margin-top:10px;font-weight:bold;'>${layerTitle}</p>`;
    legend+=`<p><img class=${layerName} src=${url} /><br class=${layerName} /></p></div>`;
    return legend;
  }
  handleLayer('blueSky:SPI_2021_12').addTo(map);
  document.getElementById("blueSky:SPI_2021_12").checked=true;
  $('.legend').append(wmsLegendControl('blueSky:SPI_2021_12','blueSky:SPI_2021_12'));
 // $('.legend').append(wmsLegendControl('SPI_2024_12','geoapp2:24_12.img'));