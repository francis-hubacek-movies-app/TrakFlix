"use strict";

$(window).on('load', function () {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(function(element) {
                $('#movies').append(`<p>${element.title}</p>`)
            })
            $('#loading').hide();
        });

});

$('#addMovieButton').click(function(e) {
    e.preventDefault();
    function addMovie() {
        let title = $('#movieTitle').val();
        console.log(title);
        let rating = $('#movieRating').val();
        console.log(rating);
        return {title, rating};
    }

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addMovie())
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            $('#movies').append(`<p>${data.title}</p>`)
        })
        .catch(error => console.error(error));
});