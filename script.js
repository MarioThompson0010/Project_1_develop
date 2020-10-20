$(document).ready(function(){
    $.ajax({
        url: "https://rapidapi.p.rapidapi.com/games/Rise%20of%20the%20Tomb%20Raider?",
        method: "GET",
        headers : {
            "x-rapidapi-key" : "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40",
            "x-rapidapi-host" : "chicken-coop.p.rapidapi.com"
        }
    }).then(calledGuy);

    function calledGuy(event)
    {
        var i = 0;
    }
});