"use strict";
let titleArr = [];
let ratingArr = [];
fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(function(element) {
            $('#movies').append(`<div class="movieCard"><p class="movieTitle">${element.title}</p><p class="movieRating">${element.rating}</p><button class="editButton">Edit</button><button class="deleteButton">Delete</button></div>`)
            titleArr.push(element.title);
            ratingArr.push(element.rating);
        })
        $('#loading').hide();
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
            titleArr.push(data.title);
            ratingArr.push(data.rating);
        })

        .catch(error => console.error(error));
});

$('#movies').on('click', '.editButton', function(e) {
    e.preventDefault();
    const movieCard = $(this).closest('.movieCard');
    const movieId = movieCard.data('id');
    const title = movieCard.find('.movieTitle').text();
    const rating = movieCard.find('.movieRating').text();

    // Show a prompt to get the new title and rating
    const newTitle = prompt('Enter a new title:', title);
    const newRating = prompt('Enter a new rating:', rating);

    if (newTitle && newRating) {
        // Send a PUT request to update the movie in the server
        fetch(`http://localhost:3000/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, rating: newRating })
        })
            .then(() => {
                // Update the movie card with the new title and rating
                movieCard.find('.movieTitle').text(newTitle);
                movieCard.find('.movieRating').text(newRating);
            })
            .catch(error => console.error(error));
    }
});



console.log(titleArr);
console.log(ratingArr);



