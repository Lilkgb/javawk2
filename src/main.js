import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(".findDoctor").hide();
$(".recentlySearched").hide();

$(document).ready(function() {
  let doctorAPI = new Doctor();
  navigator.geolocation.getCurrentPosition(function(location) {
    let currentLocation = doctorAPI.getLocation(location.coords.latitude, location.coords.longitude);
    currentLocation.then(function(response) {
      let body = JSON.parse(response);
      $(".city").val(body[0].address.postcode);
      $(".stateVal").val(body[0].address.state).change();
      console.log(body);
    })
  });
  $(".findDoc").click(function() {
    $(".findDoctor").toggle("slow");
  });
  $(".findDoctor").submit(function(event) {
    $(".error").text('');
    $(".info").text('');
    event.preventDefault();
    const state = $("option:selected").val();
    const cityInput = $(".city").val();
    const city = cityInput.toLowerCase();
    const docName = $(".name").val();
    const range = $(".range").val();
    console.log(range);
    $(".name").val('');
    $(".loading").show();
    let locationPromise = doctorAPI.getLocation(city,state);
    locationPromise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      let lat = `${body[0].lat}`;
      let lon = `${body[0].lon}`;
      console.log(lat, lon);
      let promise = doctorAPI.getDoctor(docName, lat, lon, range);
      promise.then(function(response) {
        let body = JSON.parse(response);
        console.log(body);
        $(".recentlySearched").show();
        $(".recent").append(`${docName} `)
        setTimeout(() => {
          for (let i = 0; i < body.data.length; i++){
            $(".info").append(`<div class="names"> Doctor:<b> ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</b><br> Gender: <b>${body.data[i].profile.gender}</b><br> Works at: <b>${body.data[i].practices[0].name}</b><br> Specialty:<b> ${body.data[i].specialties[0].name}</b><br> Phone Number <a href=tel:${body.data[i].practices[0].phones[0].number}>${body.data[i].practices[0].phones[0].number}</a></div>`);
            if(body.data[i].profile.gender == "undefined") {
              return "Not Listed"
            }
          }
          $(".loading").hide();
          if (body.data.length === 0) {
            $(".error").text("Sorry, there was no results with that name in your area.")
          }
        },2000);
      })
    })
  });
});
