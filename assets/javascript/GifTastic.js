var topics = ["Spongebob", "Squidward", "Plankton", "Aladdin", "Jafar", "Ursula"];

var buttonNumber = 0;
function buttonmaker() {
    for (let i = buttonNumber; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        // $("<button>").attr("data-state", "still");
        $("#buttondiv").append(button);
        buttonNumber++;

    }
}
buttonmaker();

$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    var newCartoon = $("#cartoon").val().trim();
    topics.push(newCartoon);
    console.log(topics);
    $("#cartoon").val("");
    buttonmaker();
});

var imageid = 0;
$(document.body).on("click", "button", function () {
    var cartoon = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // var gifDiv = $("<div>").addClass("gifs").attr("id", imageid);

                var rating = results[i].rating;
                var link = results[i];

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("data-still", results[i].images.downsized_still.url).attr("data-animate", results[i].images.downsized.url).addClass("gifs").attr("id", imageid);
                personImage.attr("data-state", "still").attr("src", personImage.attr("data-still"));

                // gifDiv.prepend(p);
                // gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(p).prepend(personImage);
                // $("#gifs-appear-here").prepend(gifDiv);

                imageid++;
            }
        });
});


$(document.body).on("click", ".gifs", function () {
    // $("#gifs-appear-here", ).on("click", function () {

    console.log($('div.gifs img'));

    console.log(this);

    if ($(this).attr("data-state") === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
});