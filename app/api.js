export const api = {
  getDeviceInfo: function(){
    return fetch('https://api.rach.io/1/public/device/c761bfa0-4c49-4b4f-8a79-04e42bea881a',
    {
      headers: {
        "Authorization": "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e",
        "Content-Type":"application/json"
      },
      method: "GET"
    })
  },

  runZone: function(){
    return fetch('https://api.rach.io/1/public/zone/start_multiple',
      {
        headers: {
          "Authorization": "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e",
          "Content-Type":"application/json"
        },
        method: "PUT",
        body: '{ "zones" : []}'
      })
  },
  getEvents: function(){
    var now = Number(new Date())
    var hourAgo = Number(new Date()) - (3600000 * 4)

    return fetch('https://api.rach.io/1/public/device/c761bfa0-4c49-4b4f-8a79-04e42bea881a/event?startTime=' + hourAgo + '&endTime=' + now,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e",
          "Content-Type":"application/json"
        }
      })
  }
}

export const apiUtil = {

  initZones: function(zones){
    let output = []
    zones.forEach(function(zone){
        output.push({
          id: zone.id,
          name: zone.name,
          selected: false,
          running: false
        })
    })

    console.log("init")
    return output
  },
  getZoneStatus: function(events, zones){
    let lastEvents = {}
    let newZones = zones.slice()
    events.forEach(function(event){
      let eventZoneId
      for(var data in event.eventDatas){
        if(event.eventDatas[data]["key"] === "zoneId"){
          eventZoneId = event.eventDatas[data]["convertedValue"]
        }
      }

      if (event.type === "ZONE_STATUS"  && event.lastUpdateDate > ( lastEvents[eventZoneId] ? lastEvents[eventZoneId].lastUpdateDate : 0 )){
        lastEvents[eventZoneId] = {lastUpdateDate: event.lastUpdateDate}
        event.subType === "ZONE_STARTED" ? lastEvents[eventZoneId].isRunning = true : lastEvents[eventZoneId].isRunning = false
      }
    })
    newZones.forEach(function(zone){
      if(lastEvents[zone.id]){
        zone.running = lastEvents[zone.id].isRunning
      }
    })
    newZones.forEach(function(e){
    })

    console.log('gzs', newZones)
    return newZones

  }

}
