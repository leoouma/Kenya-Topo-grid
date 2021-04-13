
let mapLayer = L.map('mainmap').setView([0, 37], 6);

// let myTileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     minZoom: 2,
//     id: 'myid',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'myapikey'
// });



let myTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2,
})
L.control.locate().addTo(mapLayer);

myTileLayer.addTo(mapLayer);
L.control.scale().addTo(mapLayer);

let myStyle = {
    "fillColor": null,
    "fillOpacity": 0,
    "color": '#ff1c60',
    "weight": 0.5,
};
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


let indexLayer = L.geoJson(topo_grids,{style: myStyle,onEachFeature: onEachFeature});
indexLayer.addTo(mapLayer);

mapLayer.addControl( new L.Control.Search(
    {
        layer: indexLayer,
        propertyName: 'Sheet_name',
        autoCollapse: true,
        zoom: 10,
        hideMarkerOnCollapse: true,
    }) );



function highlightFeature(e) {

    let layer = e.target;
    info.update(layer.feature.properties);
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.1
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
};

function resetHighlight (e) {
    indexLayer.resetStyle(e.target);
    info.update();
};


function zoomToFeature (e) {
    mapLayer.fitBounds (e.target.getBounds())
};


let info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Reference Index Details</h4>' +  (props ?
        '<b>' + props.Sheet_no + '   '+'</b>' + props.Sheet_name +'<b><br />'+ props.Sheet_no_a +'</b><br />'+ '<b>'+ props.Utm_Zone +'</b><br />'
        : 'Hover over a box');
};

info.addTo(mapLayer)



// let legend = L.control({position: 'bottomright'});

// legend.onAdd = function (mapLayer) {
//     let divv = L.DomUtil.create('div', 'info legend');
//     return divv;
// };

// //legend.addTo(mapLayer);