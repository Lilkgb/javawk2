import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(document).ready(function() {
  let doctorAPI = new Doctor();
  $(".findDoctor").hide();
  $(".recentlySearched").hide();
  $(".findDoc").click(function() {
    $(".findDoctor").toggle("slow");
  });
  $(".findDoctor").submit(function(event) {
    $(".info").text('');
    event.preventDefault();
    const state = $("option:selected").val();
    const cityInput = $(".city").val();
    const city = cityInput.toLowerCase();
    console.log(city);
    const docName = $(".name").val();
    $(".name").val('');
    if (docName == '') {
      return $(".info").text("You did not input correct information. Please try again");
    }
    $(".recentlySearched").show();
    $(".recent").append(`${docName} `)
    // $(".loading").show();
    let promise = doctorAPI.getDoctor(docName, city, state);

    promise.then(function(response) {
      let body = JSON.parse(response);
      setTimeout(() => {
        console.log(body.data);
        for (let i = 0; i < body.data.length; i++){
        $(".info").append(`<div class="names"> Doctor:<b> ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</b><br> Gender: <b>${body.data[i].profile.gender}</b><br> Works at: <b>${body.data[i].practices[0].name}</b><br> Specialty:<b> ${body.data[i].specialties[0].name}</b><br> Phone Number <a href=tel:${body.data[i].practices[0].phones[0].number}>${body.data[i].practices[0].phones[0].number}</a></div>`);
        if(body.data[i].profile.gender == "undefined") {
          return "Not Listed"
        }
        $(".loading").hide();
       }
     },2000);
    })
  });
});
