jQuery(document).ready(function(){
    $('#spinner').html('<div class="spinner-border text-light spinner1" role="status"><span class="sr-only">Loading...</span></div>'); 
    axios.get('http://csc225.mockable.io/movies')
        .then(function(response){
            console.log(response.data);
            var moviesHTML = response.data.map(function(movie){
                return '<p class="movie" data-movie="'+movie.id+'">' + movie.title + '</p><span class="text-success mb-3" id="spinner2-sm-' + movie.id + '"></span>' ;
            });
            $('#spinner').html('');
            $('#movie').html(moviesHTML);


        });

        $('body').on('click', '.movie', function(){
            var id = $(this).data('movie');
            var url = 'https://csc225.mockable.io/movies/' + id;
            if(screen.width < 576){
                $('#spinner2-sm-' + id +'').html('<p>..LOADING..</p>');
            }
            else {
                $('#current-movie').html('<div class="d-flex justify-content-center"><div class="spinner-border text-light spinner2" role="status"><span class="sr-only">Loading...</span></div></div>');
            }           
            axios.get(url).then(function(response){
                var movie = response.data;
                var movieHTML = '<div class="d-flex justify-content-center"><div class="card mt-3" style="width: 18rem;"><img class="card-img-top" src="' + movie.poster + '" alt="movie poster""><div class="card-body">'
                movieHTML += '<h5 class="card-title">' + movie.title + '</h5>'
                movieHTML += '<p class="card-text">' + movie.director + '</p>'
                movieHTML += '<p class="card-text">' + movie.release + '</p></div></div></div>'
                if(screen.width < 576){
                    $('#spinner2-sm-' + id +'').html('');
                    $('#current-movie').html(movieHTML);
                }
                else {
                    $('#current-movie').html(movieHTML);
                }   
            })
        });
});