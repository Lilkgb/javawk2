import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(document).ready(function() {
  $(".form").submit(function(event) {
    event.preventDefault();
    let docName = $(".name").val();
    $(".name").val('');
    console.log(docName);
    // var xhr = $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=OR&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`);
    // xhr.done(function(data) { console.log("success got data", data); });
    let doctorAPI = new Doctor();
    let promise = doctorAPI.getDoctor(docName);
    console.log(promise);

    promise.then(function(response) {
      let body = JSON.parse(response);
      $(".info").text(`${body.data.practices.name}`);
    })
  });
});
