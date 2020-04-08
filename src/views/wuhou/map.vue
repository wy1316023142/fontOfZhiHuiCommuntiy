<template>
  <div class="container">
    <baidu-map
            class="map"
            :center="center"
            :zoom="zoom"
            :mapStyle="mapStyle"
            @ready="handler"
            :scroll-wheel-zoom="true"
            ak="MGoVka4kmzYKHimt4LEvl8KhpNz5GFF4"
    >
    </baidu-map>
  </div>
</template>

<script>
  import Api from '@/common/api.js'
  import { debounce } from "lodash"
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import { getUrlParame } from '@/common/util.js'
  import icon1 from '@/assets/image/zhsq/11.png'
  import icon2 from '@/assets/image/zhsq/22.png'
  import icon3 from '@/assets/image/zhsq/33.png'
  import icon4 from '@/assets/image/zhsq/44.png'
  import icon5 from '@/assets/image/zhsq/55.png'
  import icon6 from '@/assets/image/zhsq/66.png'
export default {
    components: {
        BaiduMap,
        BmMarker,
        BmInfoWindow
    },
    data() {
      return {
          mapStyle: {

              styleJson:[{
                  "featureType": "land",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#091220ff"
                  }
              }, {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#113549ff"
                  }
              }, {
                  "featureType": "green",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#0e1b30ff"
                  }
              }, {
                  "featureType": "building",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "building",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#113549ff"
                  }
              }, {
                  "featureType": "building",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#dadada00"
                  }
              }, {
                  "featureType": "subwaystation",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#113549B2"
                  }
              }, {
                  "featureType": "education",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "medical",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "scenicspots",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "weight": "4"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#fed66900"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "weight": "2"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffeebb00"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "arterial",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on",
                      "weight": "1"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#979c9aff"
                  }
              }, {
                  "featureType": "local",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffffff"
                  }
              }, {
                  "featureType": "railway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "weight": "1"
                  }
              }, {
                  "featureType": "railway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#123c52ff"
                  }
              }, {
                  "featureType": "railway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "weight": "1"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#d8d8d8ff"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#979c9aff"
                  }
              }, {
                  "featureType": "subway",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffffff"
                  }
              }, {
                  "featureType": "continent",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "continent",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "continent",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "continent",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "city",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "city",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "city",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "city",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "town",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "town",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "town",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#454d50ff"
                  }
              }, {
                  "featureType": "town",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffffff"
                  }
              }, {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "poilabel",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "districtlabel",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "road",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "road",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "district",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "on"
                  }
              }, {
                  "featureType": "poilabel",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "poilabel",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "poilabel",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "manmade",
                  "elementType": "geometry",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "districtlabel",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffffff"
                  }
              }, {
                  "featureType": "entertainment",
                  "elementType": "geometry",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "shopping",
                  "elementType": "geometry",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "highway",
                  "stylers": {
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "stylers": {
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "stylers": {
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "stylers": {
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "stylers": {
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "stylers": {
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "stylers": {
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "stylers": {
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "stylers": {
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "stylers": {
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "stylers": {
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "stylers": {
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "stylers": {
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "10",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "8-10"
                  }
              }, {
                  "featureType": "cityhighway",
                  "stylers": {
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "stylers": {
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "stylers": {
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "stylers": {
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "6",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "7",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "8",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off",
                      "level": "9",
                      "curZoomRegionId": "0",
                      "curZoomRegion": "6-9"
                  }
              }, {
                  "featureType": "subwaylabel",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "subwaylabel",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "tertiarywaysign",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "tertiarywaysign",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "provincialwaysign",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "provincialwaysign",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "nationalwaysign",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "nationalwaysign",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "highwaysign",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "highwaysign",
                  "elementType": "labels.icon",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "village",
                  "elementType": "labels",
                  "stylers": {
                      "visibility": "off"
                  }
              }, {
                  "featureType": "district",
                  "elementType": "labels.text",
                  "stylers": {
                      "fontsize": "20"
                  }
              }, {
                  "featureType": "district",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "district",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "country",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "country",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#2dc4bbff"
                  }
              }, {
                  "featureType": "water",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "cityhighway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "tertiaryway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "tertiaryway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff10"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "provincialway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "geometry.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "highway",
                  "elementType": "labels.text",
                  "stylers": {
                      "fontsize": "20"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels.text.stroke",
                  "stylers": {
                      "color": "#ffffff00"
                  }
              }, {
                  "featureType": "nationalway",
                  "elementType": "labels.text.fill",
                  "stylers": {
                      "color": "#12223dff"
                  }
              }]
          },
          center: {lng: 104.04289015403499, lat: 30.63011823139385},
          zoom: 18,
      }
    },
    mounted() {

    },
    methods:{
        handler ({BMap, map}) {
            this.center.lng = 104.04289015403499
            this.center.lat = 30.63011823139385
            this.zoom = 18

        },
    }
};
</script>
<style lang="less" scoped>
  .container{
    box-sizing: border-box;
    width: 100%;
    height: 1080px;
    position: relative;
    color: #ADB9E4;
    font-size: 14px;
    .map{
      width: 100%;
      height: 100%;
      z-index: 1;

    }
  }

</style>
