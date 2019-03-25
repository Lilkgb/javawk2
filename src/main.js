import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(".recentlySearched").hide();

$(document).ready(function() {
  const doctorAPI = new Doctor();
  navigator.geolocation.getCurrentPosition(function(location) {
    const currentLocation = doctorAPI.getLocation(location.coords.latitude, location.coords.longitude);
    currentLocation.then(function(response) {
      const body = JSON.parse(response);
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
    const locationPromise = doctorAPI.getLocation(city,state);
    locationPromise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      const lat = `${body[0].lat}`;
      const lon = `${body[0].lon}`;
      console.log(lat, lon);
      const promise = doctorAPI.getDoctor(docName, lat, lon, range);
      promise.then(function(response) {
        const body = JSON.parse(response);
        console.log(body);
        $(".recentlySearched").show();
        $(".recent").append(`${docName} `)
        doctorAPI.showResponse(body);
      })
    })
  });
});
