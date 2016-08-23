

export const api = {

  runZone: function(){
    fetch('https://api.rach.io/1/public/zone/start_multiple',
      {
        headers: {
          "Authorization": "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e",
          "Content-Type":"application/json"
        },
        method: "PUT",
        body: '{ "zones" : []}'
      })
  },
  getZones: function(){
    fetch('https://api.rach.io/1/public/device/c761bfa0-4c49-4b4f-8a79-04e42bea881a', {
      method: "GET",
      headers: {
        "Authorization": "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e",
        "Content-Type":"application/json"
      }
    }).then((res) => res.json()).then((res) => {
      return res
    })
  }


}
