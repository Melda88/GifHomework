$('document').ready(function() {
    console.log("JS linked and working");

    //THE GLOBAL VARIABLES
    var buttonHTML = '';
    var buttonArray = ["Thor", "Hulk", "Spiderman", "Deadpool", "Ironman", "BlackWidow","HawkEye","Loki","CaptainAmerica"];
    var newHeroItem;
    var GIFarray = [];


    //create buttons when load 
    function createTheButtons() {
        for (var i = 0; i < buttonArray.length; i++) {
            buttonHTML += "<button class='btn btn-lrg btn-success heroButtons' heroName=" + buttonArray[i] + ">" + buttonArray[i] + "</button>";
        }
        $('#buttonsDiv').html(buttonHTML);
    }

    //create function
    createTheButtons();

    //on click of submit button
    $('body').on('click', '#submitUserData', function(event) {
        event.preventDefault(); //this will stop refresh of page 
        newHeroItem = $('#userInput').val();
        var newHeroButton = "<button class='btn btn-lrg btn-success heroButtons' heroName=" + newHeroItem + ">" + newHeroItem + "</button>";
        $('#buttonsDiv').append(newHeroButton); //append scope-limited variable html to #buttonsDiv as new button.
    });

    //on click of body, listen for class of heroButtons, if match, run this function.
    $('body').on('click', '.heroButtons', function(event) {
        $('.GIFdiv').empty(); //clear div of old GIFs.
        var chosenHeroItem = $(this).attr('heroName');



        //ajax to giphy.com, limit 15. 

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenHeroItem + "&limit=15" + "&api_key=dc6zaTOxFJmzC"; //The API Key.
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) /*loads all responses in random order */ {
                for (var i = 0; i < response.data.length; i++) {
                    $('.GIFdiv').append("<div class='GIFbox'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='image-container'><img class='heroIMG img-responsive center-block'" +
                        "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" +
                        response.data[i].images.downsized_still.url + "'></div></div>");
                    GIFarray.push(response.data[i].images.downsized.url);
                }
                $(".giphyFooter").removeClass("hideMe");
            }); //end ajax

    });

    //we need to animate gifs when clicked (do last)
    $('body').on('click', '.heroIMG', function() {
        var state = $(this).attr('data-state');
        var GIFnotMoving = $(this).attr('data-still');
        var GIFmoving = $(this).attr('data-animate');
        if (state === 'still') {
            $(this).attr('src', GIFmoving);
            $(this).attr('data-state', 'animate');
        } //on second click, return gif to beginning.
        else if (state !== "still") {
            $(this).attr('src', GIFnotMoving);
            $(this).attr('data-state', 'still');
        };
    }); 

}); 