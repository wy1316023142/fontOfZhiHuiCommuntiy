export default [
    {
      name: 'zhsqGetAge', // 年龄结构
      url: 'http://222.211.78.60:9103/bigscreen/statistics/ageStructure/:organId',
      methods: ['get']
    },
    {
        name: 'zhsqGetPoulationNumber', // 人口
        url: 'http://222.211.78.60:9103/bigscreen/statistics/popNumber/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetPoulationRentNumber', // 实有租住人口
        url: 'http://222.211.78.60:9103/bigscreen/statistics/populationNumber/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetSexStructure', // 性别
        url: 'http://222.211.78.60:9103/bigscreen/statistics/sexStructure/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetHouseNumber', // 房屋统计
        url: 'http://222.211.78.60:9103/bigscreen/statistics/houseNumber/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetHouseClassification', // 房屋管理
        url: 'http://222.211.78.60:9103/bigscreen/statistics/houseClassification/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetOpenDoorNumber', // 人员通行
        url: 'http://222.211.78.60:9103/bigscreen/statistics/openDoorNumber/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetVehicleNumber', // 车辆通行
        url: 'http://222.211.78.60:9103/bigscreen/statistics/vehicleNumber/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetRfidNumber', // 非机动车通行
        url: 'http://222.211.78.60:9103/bigscreen/statistics/rfidRecordNum/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetTodayNumber', // 当日通行通行
        url: 'http://222.211.78.60:9103/bigscreen/statistics/through/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetPersonPlaceCount', // 人员籍贯分布
        url: 'http://222.211.78.60:9103/bigscreen/statistics/native/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetPersonCountryCount', // 境外人员统计
        url: 'http://222.211.78.60:9103/bigscreen/statistics/country/:organId',
        methods: ['get']
    },
    {
        name: 'zhsqGetDeviceList', // 地图资源
        url: 'http://222.211.78.60:9103/bigscreen/statistics/deviceList/:organId',
        methods: ['get']
    },
]
