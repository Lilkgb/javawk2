export default class Doctor {
  getDoctor(doctor) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor}&location=OR&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=1444ae1df809a2c84653c5b90a9e9726`;
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
