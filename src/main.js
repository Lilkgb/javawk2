import $ from 'jquery';
import './input.scss';
import Doctor from './backEnd.js';

$(document).ready(function() {
  $(".loading").hide();
  let doctorAPI = new Doctor();
  $(".form").submit(function(event) {
    $(".info").text('');
    $(".loading").show();
    event.preventDefault();
    let docName = $(".name").val();
    $(".name").val('');
    console.log(docName);
    let promise = doctorAPI.getDoctor(docName);

    promise.then(function(response) {
      let body = JSON.parse(response);
      setTimeout(() => {
        for (let i = 0; i < body.data.length; i++){
        $(".info").append(`From the name you gave us we found this doctor: ${body.data[i].practices[0].name}<br>You can call them at <a href=tel:${body.data[i].practices[0].phones[0].number}>${body.data[i].practices[0].phones[0].number}</a><br><br>`);
        console.log(body.data);
        $(".loading").hide();
       }
     },2000);
    })
  });
});
