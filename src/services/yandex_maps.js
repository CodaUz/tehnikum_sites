// setYandexMaps("map");

function setYandexMaps(id) {
  let script = document.createElement("script");
  script.src =
    "https://api-maps.yandex.ru/2.1/?apikey=b517fdfa-55e3-449a-8bf3-b6541a113e3&lang=ru_RU";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
  setTimeout(() => {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map(`${id}`, {
        center: [41.303027, 69.267644],
        zoom: 15,
      });
      myMap.geoObjects.add(
        new ymaps.Placemark(
          [41.303027, 69.267644],
          {},
          {
            preset: "islands#greenDotIconWithCaption",
          }
        )
      );
    }
  }, 1000);
}
