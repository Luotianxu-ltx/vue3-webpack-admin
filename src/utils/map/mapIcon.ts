import L from '@/lib/leaflet'

const getMapBasicIconRequire = {
    'start': L.icon({iconUrl: require('/src/static/img/map/map-start.png'), iconSize: [26, 26]}),
    'end': L.icon({iconUrl: require('/src/static/img/map/map-end.png'), iconSize: [26, 26]}),
    'jiantou': L.icon({iconUrl: require('/src/static/img/map/jiantou.png'), iconSize: [15, 15]}),
    'run': L.icon({iconUrl: require('/src/static/img/map/car_run.png'), iconSize: [26, 26]})
}

export {
    getMapBasicIconRequire
}
