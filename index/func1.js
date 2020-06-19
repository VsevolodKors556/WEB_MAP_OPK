var image = "./../index/Floor1";
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

function getDate() {
  var date = new Date();
  weekday = date.getDay()
  switch (weekday) {
    case 0: weekday = 'Воскресенье';
      break;
    case 1: weekday = 'Понедельник';
      break;
    case 2: weekday = 'Вторник';
      break;
    case 3: weekday = 'Среда';
      break;
    case 4: weekday = 'Четверг';
      break;
    case 5: weekday = 'Пятница';
      break;
    case 6: weekday = 'Суббота';
      break;
  }
  day = date.getDate()
  month = date.getMonth()
  switch (month) {
    case 0: month = 'Января';
      break;
    case 1: month = 'Февраля';
      break;
    case 2: month = 'Марта';
      break;
    case 3: month = 'Апреля';
      break;
    case 4: month = 'Мая';
      break;
    case 5: month = 'Июня';
      break;
    case 6: month = 'Июля';
      break;
    case 7: month = 'Августа';
      break;
    case 8: month = 'Сентября';
      break;
    case 9: month = 'Октября';
      break;
    case 10: month = 'Ноября';
      break;
    case 11: month = 'Декабря';
      break;
  }
  year = date.getFullYear()
  datex = `<div align="center">Сегодня Понедельник , 25 мая 2020г.</div>`
  return (datex)
}


function getDataofcabinet(cab) {
  c = `<div align="center">Кабинет: ${cab}</div>`
  /*socket.emit("getData", cab ,res =>{
console.log(res)
  })*/
  //date = getDate()
  date = `<div align="center">Сегодня Понедельник , 25 мая 2020г.</div>`
  switch (cab) {
    case "101":
      table = `<div class="datagrid"><table>
      <thead><tr><th>№</th><th>Дисциплина</th><th>Группа</th><th>Преподаватель</th></tr></thead>
               <tbody><tr><td>1</td><td>УП.04</td><td>МЧМ-17-18д</td><td>Соловцов С.В.</td></tr>
          <tr class="alt"><td>2</td><td>УП.04</td><td>МЧМ-17-18д</td><td>Соловцов С.В.</td></tr>
                      <tr><td>3</td><td>Теплотехника</td><td>ОМД-17</td><td>Кобзарева А.А.</td></tr>
          <tr class="alt"><td>4</td><td>Теплотехника</td><td>ОМД-17</td><td>Кобзарева А.А.</td></tr>
                      <tr><td>5</td><td></td><td></td><td></td></tr>
          <tr class="alt"><td>6</td><td></td><td></td><td></td></tr>
      </tbody>
  </table></div>`
      break;
    case "103":
      table = `<div class="datagrid"><table>
      <thead><tr><th>№</th><th>Дисциплина</th><th>Группа</th><th>Преподаватель</th></tr></thead>
               <tbody><tr><td>1</td><td>Безоп.жизн.</td><td>ИСП-18-3</td><td>Демба И.М.</td></tr>
          <tr class="alt"><td>2</td><td>Безоп.жизн.</td><td>ИСП-18-3</td><td>Демба И.М.</td></tr>
                      <tr><td>3</td><td>Безоп.жизн.</td><td>ИСП-18-3</td><td>Демба И.М.</td></tr>
          <tr class="alt"><td>4</td><td></td><td></td><td></td></tr>
                      <tr><td>5</td><td></td><td></td><td></td></tr>
          <tr class="alt"><td>6</td><td></td><td></td><td></td></tr>
      </tbody>
  </table></div>`
      break;
    case "104":
      table = `<div class="datagrid"><table>
        <thead><tr><th>№</th><th>Дисциплина</th><th>Группа</th><th>Преподаватель</th></tr></thead>
                 <tbody><tr><td>1</td><td></td><td></td><td></td></tr>
            <tr class="alt"><td>2</td><td></td><td></td><td></td></tr>
                        <tr><td>3</td><td></td><td></td><td></td></tr>
            <tr class="alt"><td>4</td><td></td><td></td><td></td></tr>
                        <tr><td>5</td><td></td><td></td><td></td></tr>
            <tr class="alt"><td>6</td><td></td><td></td><td></td></tr>
        </tbody>
    </table></div>`
      break;
    default:
      table = ``
      break;
  }

  x = c + date + table
  return (x)
}

// Создание полигонов
var createPolygon = async data => {
  var polygon = L.polygon([JSON.parse(data.coords)], {
    name: data.name,
    fillColor: "#0070A8"
  }).addTo(map);
  polygon.dataid = data.id;
  //Отображение данных по клику на полигон
  polygon.on('click', (e) => {
    if (data.num != 'Центральная Лестница' && data.num != 'Центральный выход') {
      var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(getDataofcabinet(data.num))
        .openOn(map);
    }
    else {
      if (data.num == 'Центральная Лестница') { k = 'Центральная Лестница' }
      else { k = 'Центральный выход' }
      date = getDate()
      var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(`<div align="center">${k}</div><div align="center">${date}</div>`)
        .openOn(map);
    }
    console.log(data.num)
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
  floor = 1; // меняем на номер этажа
  socket.emit("getAllCabinet", floor, res => {
    async.eachOfSeries(res, async (row, ind) => {
      createOption(row);
      createPolygon(row);
    });
  });

  $('#find').on('click', () => {
    find()
  })

  $('.rb').click(el => {
    count = $(el.target).val()
    $(location).attr('href', `/${count}`)
  })
});

var polyline = null

var find = () => {
  if (polyline)
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
