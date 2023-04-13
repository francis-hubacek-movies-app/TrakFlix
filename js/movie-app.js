'use strict';
let titleArr = [];
let ratingArr = [];
let genreArr = [];
let movieCount = 0;


fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(function(element) {
            $('#movies').append(`<div></div><div id = "${element.id}" class="movieCard"><h2 class="movieTitle">${element.title}</h2><p class="movieGenre">${element.genre}</p><p class="movieRating">${element.rating} <i class="fa-solid fa-star fa-2xl" style="color: #d70fcf;"></i></p><button class="editButton">Edit</button><button class="deleteButton">Delete</button></div>`);
            titleArr.push(element.title);
            ratingArr.push(element.rating);
            genreArr.push(element.genre);

        });
        movieCount = data.length;
        $('#movieCount').html(`Total Movies: ${movieCount}`)
        $('#loading').hide();

        console.log(titleArr);
        console.log(ratingArr);
    });


$('#addMovieButton').click(function(e) {
    e.preventDefault();
    $('#movieCount').html(`Total Movies: ${movieCount}`)
    function addMovie() {
        let title = $('#movieTitle').val();
        console.log(title);
        let rating = $('#movieRating').val();
        console.log(rating);
        let genre = $('#movieGenre').val();
        console.log(genre);
        return {title, rating, genre};
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
            $('#movies').append(`<div id="${data.id}" class="movieCard"><h2 class="movieTitle">${data.title}</h2><p class="movieGenre">${data.genre}</p><p class="movieRating">${data.rating} <i class="fa-solid fa-star fa-2xl" style="color: #d70fcf;"></i></p><button class ="editButton">Edit</button><button class="deleteButton">Delete</button></div>`);
            titleArr.push(data.title);
            ratingArr.push(data.rating);
            console.log(titleArr);
            console.log(ratingArr);
            movieCount+=1;
            $('#movieCount').html(`Total Movies: ${movieCount}`)
        })
        .catch(error => console.error(error));
});

//function to edit current displayed movies
$('#movies').on('click', '.editButton', function(e) {
    e.preventDefault();
    const movieCard = $(this).closest('.movieCard');
    const movieId = parseInt(movieCard.attr('id'));
    console.log(movieId);
    const title = movieCard.find('.movieTitle').text();
    const rating = movieCard.find('.movieRating').text();
    const genre = movieCard.find('.movieGenre').text();

    // Show a prompt to get the new title and rating
    const newTitle = prompt('Enter a new title:', title);
    const newGenre = prompt('Enter a new genre:', genre);
    const newRating = prompt('Enter a new rating:', rating);


    if (newTitle && newRating) {
        // Send a PUT request to update the movie in the server
        fetch(`http://localhost:3000/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, rating: newRating, genre: newGenre })
        })
            .then(() => {
                // Update the movie card with the new title and rating
                movieCard.find('.movieTitle').text(newTitle);
                movieCard.find('.movieRating').html(`${newRating}  <i class="fa-solid fa-star" style="color: #ffdc05;"></i>`);
            })
            .catch(error => console.error(error));
    }
});


$('#movies').on('click', '.deleteButton', function(e) {
    e.preventDefault();
    $('#movieCount').html(`Total Movies: ${movieCount}`)
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
                movieCount -= 1;
                $('#movieCount').html(`Total Movies: ${movieCount}`)
            })
            .catch(error => console.error(error));
    }

});

console.log(titleArr);
console.log(ratingArr);
console.log(genreArr);

$('#searchButton').click(function(e) {
    e.preventDefault();
    const searchValue = $('#movieSearch').val();
    const filteredMovies = [];

    // loop through the movies and check if the search value matches the title or genre
    for (let i = 0; i < titleArr.length; i++) {
        if (titleArr[i].toLowerCase().includes(searchValue.toLowerCase()) ||
            genreArr[i].toLowerCase().includes(searchValue.toLowerCase())) {
            filteredMovies.push(i);
        }
    }
    console.log(searchValue);

    // hide all movie cards and show only the filtered ones
    $('.movieCard').hide();
    for (let i = 0; i < filteredMovies.length; i++) {
        $('#' + filteredMovies[i]).show();
    }
});

