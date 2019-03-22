export default class Doctor {
  getLocation(city,state) {
    return new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      let url = `https://nominatim.openstreetmap.org/search/${city}%20${state}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
  getDoctor(docName,location) {
    // var xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=OR&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`);
    // xhr.done(function(data) { console.log("success got data", data); });
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=${location}&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=1444ae1df809a2c84653c5b90a9e9726`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
}
