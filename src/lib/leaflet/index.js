import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * 地图基本图层
 */
require('./lib/leaflet.ChineseTmsProviders')

/**
 * 鹰眼地图
 */
require('./lib/leaflet.MiniMap')

/**
 * 网格
 */
require('./lib/leaflet.Graticule')

/**
 * 鼠标经纬度
 */
require('./lib/leaflet.MousePosition')
require('./scss/leaflet.MousePosition.css')

/**
 * 打印
 */
require('./lib/leaflet.browser.print')

/**
 * 地图探查
 */
require('./lib/leaflet.magnifyingglass')
require('./scss/leaflet.magnifyingglass.css')

/**
 * 地图卷帘
 */
require('./lib/leaflet-side-by-side')

/**
 * 画图
 */
require('./lib/leaflet.draw')
require('./scss/leaflet.draw.css')

/**
 * 聚合
 */
require('./lib/leaflet.markercluster-src')
require('./scss/MarkerCluster.css')
require('./scss/MarkerCluster.Default.css')

/**
 * 轨迹回放
 */
require('./lib/leaflet.AnimatedMarker')

require('./lib/leaflet.polylineDecorator')

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

export default L
