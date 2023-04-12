'use strict';
let titleArr = [];
let ratingArr = [];
fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(function(element) {
            $('#movies').append(`<div id = "${element.id}" class="movieCard"><p class="movieTitle">${element.title}</p><p class="movieRating">${element.rating}</p><button class="editButton">Edit</button><button class="deleteButton">Delete</button></div>`);
            titleArr.push(element.title);
            ratingArr.push(element.rating);
        });
        $('#loading').hide();

        console.log(titleArr);
        console.log(ratingArr);
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
            console.log(data);
            $('#movies').append(`<div id="${data.id}" class="movieCard"><p class="movieTitle">${data.title}</p><p class="movieRating">${data.rating}</p><button class ="editButton">Edit</button><button class="deleteButton">Delete</button></div>`);
            titleArr.push(data.title);
            ratingArr.push(data.rating);
            console.log(titleArr);
            console.log(ratingArr);
        })
        .catch(error => console.error(error));
});

$('#movies').on('click', '.editButton', function(e) {
    e.preventDefault();
    const movieCard = $(this).closest('.movieCard');
    const movieId = parseInt(movieCard.attr('id'));
    console.log(movieId);
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


$('#movies').on('click', '.deleteButton', function(e) {
    e.preventDefault();
    const movieCard = $(this).closest('.movieCard');
    const movieId = parseInt(movieCard.attr('id'));
    console.log(movieId);

    // Show a prompt to get the new title and rating
    const newDelete = confirm('Are you sure you want to delete this movie?');

    if(newDelete) {
        fetch(`http://localhost:3000/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(() => {
                // Update the movie card with the new title and rating
                movieCard.remove();
            })
            .catch(error => console.error(error));
    }

});