var image = "./../index/Floor3";
var width = 2528;
var height = 2613;
var maxLevel = 4;
var minLevel = 0;
var orgLevel = 4;

// Some weird calculations to fit the image to the initial position
// Leaflet has some bugs there. The fitBounds method is not correct for large scale bounds
var tileWidth = 256 * Math.pow(2, orgLevel);
var radius = tileWidth / 2 / Math.PI;
var rx = width - tileWidth / 2;
var ry = -height + tileWidth / 2;

var west = -180;
var east = (180 / Math.PI) * (rx / radius);
var north = 85.05;
var south = (360 / Math.PI) * (Math.atan(Math.exp(ry / radius)) - Math.PI / 4);
var rc = (tileWidth / 2 + ry) / 2;
var centerLat =
  (360 / Math.PI) * (Math.atan(Math.exp(rc / radius)) - Math.PI / 4);
var centerLon = (west + east) / 2;
var bounds = [
  [south, west],
  [north, east]
];

var map = new L.Map("map", { maxBounds: bounds });

L.tileLayer(image + "/{z}-{x}-{y}.jpg", {
  maxZoom: maxLevel,
  minZoom: minLevel,
  opacity: 1.0,
  zIndex: 1,
  noWrap: true,
  bounds: bounds,
  attribution:
    '<a href="https://github.com/oliverheilig/LeafletPano"></a>'
}).addTo(map);

var zoom = map.getBoundsZoom(bounds);
var center = new L.latLng(centerLat, centerLon);
 
function getDataofcabinet(cab){
  c=`<div align="center">Кабинет: ${cab}</div>`
  socket.emit("getData", cab ,res =>{
console.log(res)
  })
  return(c)
}

// Создание полигонов
var createPolygon = async data => {
  var polygon = L.polygon([JSON.parse(data.coords)], {
    name: data.name,
    fillColor: "blue"
  }).addTo(map);
  polygon.dataid = data.id;
  //Отображение данных по клику на полигон
    polygon.on('click', (e) => {
      if (data.num!='Центральная Лестница'){
      var popup = L.popup()
      .setLatLng(e.latlng)
     .setContent(getDataofcabinet(data.num))
      .openOn(map);
      }else{var popup = L.popup()
        .setLatLng(e.latlng)
       .setContent('<p>Центральная Лестница</p>')
        .openOn(map);}
    //console.log(data.num)         
  }); 
};

map.setView(center, zoom);

/* отправка POST запросов 
var get_data = params => {
  const result = $.ajax({
    type: "POST",
    url: params.func,
    response: "XML",
    data: { params: params }
  });
  return result;
};*/ 
var socket = io();

var floor;

var createOption = data => {
  $(`<option>${data.num}</option>`).appendTo("#start");
  $(`<option>${data.num}</option>`).appendTo("#end");
};

$(document).ready(() => {
  floor = 3; // меняем на номер этажа
  socket.emit("getAllCabinet", floor, res => {
    async.eachOfSeries(res, async (row, ind) => {
      createOption(row);
      createPolygon(row);
    });
  });

  $('#find').on('click', () => {
    find()
  })

  $(".rb").on('change', el => {
  count =   $(el.target).val()
    $('#go').attr('href', `/${count}`) 
  })
});

var polyline = null

var find = () => {
  if(polyline)
    map.removeLayer(polyline) 
  let start = $("#start").val();
  let end = $("#end").val();
  let param = { start: start, end: end };
  socket.emit("FindRoute", param, data => {
  console.log("TCL: find -> data", data)
    polyline = L.polyline(JSON.parse(data[0].route), {
      color: "red"
    }).addTo(map);
  });
  console.log("TCL: find -> param", param)
};
