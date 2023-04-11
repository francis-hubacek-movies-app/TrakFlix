"use strict";
$(window).on('load', function () {
    $('#loading').hide();

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(function(element) {
                $('#movies').append(`<p>${element.title}</p>`)
            })
        })


})


$('#addMovieButton').submit(function (event) {
    console.log("hello")
    event.preventDefault();
})



