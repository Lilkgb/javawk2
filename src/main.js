import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(document).ready(function() {
  let doctorAPI = new Doctor();
  $(".findDoctor").hide();
  $(".findDoc").click(function() {
    $(".findDoctor").toggle("slow");
  });
  $(".findDoctor").submit(function(event) {
    $(".info").text('');
    event.preventDefault();
    let docName = $(".name").val();
    $(".name").val('');
    if (docName == '') {
      return $(".info").text("You did not input correct information. Please try again");
    }
    $(".loading").show();
    let promise = doctorAPI.getDoctor(docName);

    promise.then(function(response) {
      let body = JSON.parse(response);
      setTimeout(() => {
        console.log(body.data);
        for (let i = 0; i < body.data.length; i++){
        $(".info").append(`<div class="names"> Doctor:<b> ${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</b><br>Works at: <b>${body.data[i].practices[0].name}</b><br> Specialty:<b> ${body.data[i].specialties[0].name}</b><br> Phone Number <a href=tel:${body.data[i].practices[0].phones[0].number}>${body.data[i].practices[0].phones[0].number}</a></div>`);
        $(".loading").hide();
       }
     },2000);
    })
  });
});
