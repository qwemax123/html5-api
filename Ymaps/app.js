let locationBlock = document.getElementById("location")
let map;
let ymapsLib;

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            positionCallback,
            errorPostionCallBack
        )
    }
    else {
        locationBlock.innerHTML = `Браузер или устройство не поддерживает геолокацию`
    }
}

const positionCallback = (position) => {
    console.log(position)
    locationBlock.innerHTML = `Ваши координаты: ${position.coords.longitude}-${position.coords.latitude}`
    map.setLocation({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 50
    })
}

const errorPostionCallBack = () => {
    locationBlock.innerHTML = `Вы не поделились локацией, сорри без неё не работаю`
}

getLocation()

initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapListener, YMapDefaultFeaturesLayer } = ymaps3;
    ymapsLib = ymaps3

    // Иницилиазируем карту
    map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],

                // Уровень масштабирования
                zoom: 15
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    /*Обработка события*/
    const clickCallback = (value) => {
        console.log(value);
        if (value) {
            console.log('test')
            addMarkerToMap(value.entity.geometry.coordinates)
        }
    }
    //const mouseMoveCallback = () => console.log('Я двигаю мышью...');

    // Создание объекта-слушателя.
    const mapListener = new YMapListener({
        layer: 'any',
        // Добавление обработчиков на слушатель.
        onClick: clickCallback,
        //onMouseMove: mouseMoveCallback
    });

    // Добавление слушателя на карту.
    map.addChild(mapListener);

    const markers = JSON.parse(
        localStorage.getItem('markers')
    ) || []

    markers.forEach((point) => {
        addMarkerToMap(point, false)
    });
}

const addMarkerToMap = (point, save = true) => {
    const { YMapMarker } = ymapsLib
    const markerElement = document.createElement("img")
    markerElement.src = "./marker.png"
    markerElement.style = "width:40px; transform: translate(-15px,-25px)"
    markerElement.className = 'marker-class';

    const marker = new YMapMarker(
        {
            coordinates: point,
            mapFollowingOnDrag: false
        },
        markerElement
    )
    map.addChild(marker)

    if (save) {
        const markers = JSON.parse(localStorage.getItem('markers')) || []

        markers.push(point)

        localStorage.setItem('markers', JSON.stringify(markers))
    }
}


