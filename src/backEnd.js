import $ from 'jquery';

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
  showResponse(body) {
    setTimeout(() => {
      for (let i = 0; i < body.data.length; i++){
        if(body.data[i].specialties.length === 0) {
          body.data[i].specialties = [{uid: "None Listed"}];
        }
        if(body.data[i].profile.gender == undefined){
          body.data[i].profile.gender = "None Listed";
        }
        $(".info").append(`<div class="names"> Doctor:<b> ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</b><br> Gender: <b>${body.data[i].profile.gender}</b><br> Works at: <b>${body.data[i].practices[0].name}</b><br> Specialty:<b> ${body.data[i].specialties[0].uid}</b><br> Phone Number: <a href=tel:${body.data[i].practices[0].phones[0].number}>${body.data[i].practices[0].phones[0].number}</a></div>`);
      }
      $(".loading").hide();
      if (body.data.length === 0) {
        $(".error").text("Sorry, there was no results with that name in your area.")
      }
    },2000);
  }
  getDoctor(docName,lat,lon, range) {
    // var xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=OR&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`);
    // xhr.done(function(data) { console.log("success got data", data); });
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=${lat}%2C${lon}%2C${range}&user_location=37.773%2C-122.413&skip=0&limit=25&user_key=1444ae1df809a2c84653c5b90a9e9726`;
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
