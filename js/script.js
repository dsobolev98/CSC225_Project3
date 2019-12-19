jQuery(document).ready(function(){
    $('#spinner').html('<div class="spinner-border text-light spinner" role="status"><span class="sr-only">Loading...</span></div>'); 
    axios.get('http://csc225.mockable.io/movies')
        .then(function(response){
            console.log(response.data);
            var moviesHTML = response.data.map(function(movie){
                return '<p class="movie" data-movie="'+movie.id+'">' + movie.title + '</p>' ;
            });
            $('#spinner').html('');
            $('#movie').html(moviesHTML);


        });

        $('body').on('click', '.movie', function(){
            var id = $(this).data('movie');
            var url = 'https://csc225.mockable.io/movies/' + id;
            $('#current-movie').html('...LOADING...');            
            axios.get(url).then(function(response){
                var movie = response.data;
                // var movieHTML = '<p>' + movie.title + '</p>';
                // movieHTML += '<p>' + movie.director + '</p>';
                // movieHTML += '<p>' + movie.release + '</p>';
                // movieHTML += '<p><img src="' + movie.poster + '"></p>';
                $('#title').html(movie.title);
                //$('#current-movie').html(movieHTML);
                
            })
            //$('#current-book').html('<img src="https://placehold.it/1000/1000">');

        });
});