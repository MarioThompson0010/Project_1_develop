// the following commented code does work. Use it as a model for Chicken Coop.
// $.ajax({
// url: "https://rapidapi.p.rapidapi.com/games/Rise%20of%20the%20Tomb%20Raider?",
// method: "GET",
// headers: {
// "x-rapidapi-key": "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40",
// "x-rapidapi-host": "chicken-coop.p.rapidapi.com"
// }
// }).then(calledGuy);

$(document).ready(function () {

    var queryURL = "";
    var rapidKey = "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40";
    var RAWGHost = "rawg-video-games-database.p.rapidapi.com";
    var queryURLRAWGPlatform = "https://rapidapi.p.rapidapi.com/platforms?";
    var queryURLRAWGGenre = "https://rapidapi.p.rapidapi.com/genres?";
    var chickenCoopURL = "https://rapidapi.p.rapidapi.com/games/";


    var headerParams = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com"
    }

    var headerParamsRAWG = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
        //"useQueryString": true
    }

    var headerParamsGenres = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
        //"useQueryString": true
    }

    getListOfPlatforms();
    function getListOfPlatforms(genre) {
        $.ajax({
            url: queryURLRAWGPlatform,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetPlatforms);
    }

    function calledGetPlatforms(response) {
        var debug = 1;
    }

    //getListOfGenres();
    function getListOfGenres(genre) {
        $.ajax({
            url: queryURLRAWGGenre,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetGenres);
    }

    function calledGetGenres(response) {
        var debug = 0;
        console.log(response);
    }

    //buildURL();
    //CallChickenCoop();
    function buildURL(nameOfTheVideoGame) {
        var sampleVideo = "Rise of the Tomb Raider";
        var encoded = encodeURIComponent(/*sampleVideo*/ nameOfTheVideoGame);
        queryURL = chickenCoopURL + encoded + "?";
    }



    function CallChickenCoop() {
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: headerParams
        }).then(calledCC);
    }

    function calledCC(response) {
        var i = 0;
    }
});