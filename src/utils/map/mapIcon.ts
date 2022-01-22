import L from '@/lib/leaflet'

const getMapBasicIconRequire = {
    'start': L.icon({iconUrl: '/src/assets/img/map/map-start.png', iconSize: [26, 26]}),
    'end': L.icon({iconUrl: '/src/assets/img/map/map-end.png', iconSize: [26, 26]}),
    'jiantou': L.icon({iconUrl: '/src/assets/img/map/jiantou.png', iconSize: [26, 26]}),
    'run': L.icon({iconUrl: '/src/assets/img/map/car_run.png', iconSize: [26, 26]})
}

export {
    getMapBasicIconRequire
}
