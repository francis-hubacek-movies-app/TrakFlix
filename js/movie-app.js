"use strict";

$(window).on('load', function () {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let titleArr = [];
            data.forEach(function(element) {
                $('#movies').append(`<div class="movieCard"><p class="movieTitle">${element.title}</p><p class="movieRating">${element.rating}</p><button class="editButton">Edit</button><button id="deleteButton">Delete</button></div>`)
            })
            for (let i = 0; i < $('.movieCard').length; i++) {
                titleArr.push($('.editButton:nth-of-type(i)').parent().children('.movieTitle').first().text());
            }
            {
                console.log(titleArr);
                $('#loading').hide();
            }});

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
            $('#movies').append(`<div class="movieCard"><p class="movieTitle">${data.title}</p><p class="movieRating">${data.rating}</p><button class ="editButton">Edit</button><button class="deleteButton">Delete</button></div>`)
        })
        .catch(error => console.error(error));
});






