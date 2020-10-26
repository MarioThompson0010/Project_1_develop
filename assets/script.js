// 
$(document).ready(function () {

    var PAGE_SIZE_STRING = "5"; // number of suggestions for user
    var PagesProcessed = 0;
    var SAVE_INFO_KEY = "save_info_games";
    var listOfPlatforms = [];
    var listOfGenres = [];
    var listOfGames = []; // call RAWG to get this list
    var listOfChickens = []; // this is the one that will display the data

    var listOfSearchHistory = []; // display last three searches

    var searchCriteriaSelect = {
        genreval: "",
        platval: "",
        searchval: "",

        selectedgenre: false, // 
        selectedplatform: false,
        selectedsearch: false
    };





    var clickedSearchButton = false;

    var searchObject = {
        namesearched: "",
        platformsearched: "",
        platdescription: "",
        genresearched: "",
        genredescription: "",
        key: ""
    };

    var platformObject = {
        id: 0,
        name: "",
        pagenum: 1
    };

    var genreObject = {
        id: 0,
        name: "",
        pagenum: 1
    };

    var gamesObject = {
        id: 0,
        name: "",
        pic: "",
        index: 0,
        released: ""
    };

    var chickenCoopDataObject = {
        games: gamesObject,
        description: "",
        genre: [],
        image: "",
        publisher: [],
        rating: "",
        releaseDate: "",
        score: 0,
        title: ""
    };

    var rapidKey = "a2b5d3b684mshabbf5412b1d3507p11b0a1jsnd2cd92016a40";
    var RAWGHost = "rawg-video-games-database.p.rapidapi.com";
    var queryURLRAWGPlatform = "https://rapidapi.p.rapidapi.com/platforms?";

    var queryGamesRAWG = "https://rapidapi.p.rapidapi.com/games?page_size=" + PAGE_SIZE_STRING; //&genres=4,51&platforms=21
    var queryURLRAWGGenre = "https://rapidapi.p.rapidapi.com/genres?";
    var chickenCoopURL = "https://rapidapi.p.rapidapi.com/games/";

    var headerParams = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com"
    }

    var headerParamsRAWG = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
    }

    var headerParamsGenres = {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": RAWGHost
    }

    // display platform to screen
    function displayPlatformToScreen() {

        var controlPlatform = $("#platformid");

        for (var i = 0; i < listOfPlatforms.length; i++) {
            var option = $("<option>");
            option.text(listOfPlatforms[i].name);
            option.val(listOfPlatforms[i].name);
            option.attr("data-id", listOfPlatforms[i].id);
            option.appendTo(controlPlatform);
        }

    }

    // display to screen
    function displayGenreToScreen() {

        var controlGenre = $("#genreid");

        for (var i = 0; i < listOfGenres.length; i++) {
            var option = $("<option>");
            option.text(listOfGenres[i].name);
            option.val(listOfGenres[i].name);
            option.attr("data-id", listOfGenres[i].id);
            option.appendTo(controlGenre);
        }
    }

    function getLocalStorageFunc() {
        var getlocalstorage = JSON.parse(localStorage.getItem(SAVE_INFO_KEY));

        if (getlocalstorage === null) {
            getlocalstorage = Object.create(listOfSearchHistory);
        }

        return getlocalstorage;
    }

    function PopulateLastSearches() {
        var recentul = $("#recentSearchedUL");
        var gotlocal = getLocalStorageFunc();
        recentul.empty();

        for (var i = 0; i < gotlocal.length; i++) {
            var item = gotlocal[i];
            var button = $("<button>");
            var listitem = $("<li>");

            var key = item.key;
            if (key !== undefined && key !== "") {
                button.attr("data-key", key);
                button.addClass("recentlySearchedClass");
                button.bind("click", searchRecentButton); // need this for looking up a city that was recently added
                var splitted = key.split(',');
                button.text("Error");

                if (splitted.length > 0) {
                    if (splitted[0] !== "") {
                        button.text(splitted[0]);
                    }
                    else {
                        if (splitted.length > 2) {
                            button.text(gotlocal[i].genredescription + " " + gotlocal[i].platdescription);
                        }
                    }
                }

                button.appendTo(listitem);
                listitem.appendTo(recentul);
            }
        }
    }

    function commonToSearch()
    {
        var getul = $("#resultsList");
        getul.empty();
        PagesProcessed = 0;
    }

    function searchRecentButton(event) {
        event.preventDefault();
        commonToSearch();
        var gotdata = $(this).attr("data-key");
        var splitted = gotdata.split(',');
        // get list of searches

        // selectedsearch = false;
        // selectedplatform = false;
        // selectedgenre = false;

        var searchCriteria = Object.create(searchCriteriaSelect);

        searchCriteria.searchval = splitted[0];
        searchCriteria.genreval = splitted[1];
        searchCriteria.platval = splitted[2];

        buildGamesURLHelper(searchCriteria);


        // if (searchGuy !== "") {
        // selectedsearch = true;
        // }
        // if (genreGuy !== undefined) {
        // selectedgenre = true;
        // }
        // if (platformGuy !== undefined) {
        // selectedplatform = true;
        // }

        getListOfGames(splitted[0], splitted[1], splitted[2],
            searchCriteria.selectedsearch, searchCriteria.selectedgenre, searchCriteria.selectedplatform);
    }

    function buildGamesURLHelper(searchCriteria) {

        if (searchCriteria.searchval !== "") {
            searchCriteria.selectedsearch = true;
        }
        if (searchCriteria.genreval !== "undefined") {
            searchCriteria.selectedgenre = true;
        }
        if (searchCriteria.platval !== "undefined") {
            searchCriteria.selectedplatform = true;
        }
    }

    // call this to get list of recommendations
    function searchButtonClicked(event) {
        event.preventDefault();
        clickedSearchButton = true;
        commonToSearch();
        
        var getlocalstorage = getLocalStorageFunc();


        // gather inputs
        var searchGuy = $("#searchid").val().trim();
        var searchControl = $("#searchid");
        searchControl.removeClass("errorSign");
        var errordiv = $("#errorDiv");
        errordiv.text("");

        var genreGuy = $("#genreid :selected").attr("data-id");
        var platformGuy = $("#platformid :selected").attr("data-id");

        selectedsearch = false;
        selectedplatform = false;
        selectedgenre = false;

        if (searchGuy !== "") {
            selectedsearch = true;
        }
        if (genreGuy !== undefined) {
            selectedgenre = true;
        }
        if (platformGuy !== undefined) {
            selectedplatform = true;
        }

        if (!selectedsearch && !selectedgenre && !selectedplatform) {
            searchControl.addClass("errorSign");

            errordiv.text("Enter at least one search parameter");

            return;
        }

        getListOfGames(searchGuy, genreGuy, platformGuy, selectedsearch, selectedgenre, selectedplatform);
    }

    // call API to get games
    function getListOfGames(search, genres, platforms, selectedsearch, selectedgenre, selectedplatform) {
        var geturl = buildGamesURL(search, genres, platforms, selectedsearch, selectedgenre, selectedplatform);

        $.ajax({
            url: geturl,
            method: "GET",
            headers: headerParamsRAWG

        }).then(calledGetGames)
            .then(getChickenCoopInfo);
    }

    // save to local storage
    function saveLocalStorage(response) {

        var getobjectArray = getLocalStorageFunc();

        var getobject = Object.create(searchObject);
        var searched = $("#searchid");

        var genreGuy = $("#genreid :selected"); //.val();
        var platformGuy = $("#platformid :selected"); //.val();

        var datag = genreGuy.attr("data-id");
        var datap = platformGuy.attr("data-id");

        getobject.namesearched = searched.val().trim();
        getobject.genresearched = datag;
        getobject.genredescription = $("#genreid :selected").val(); 
        getobject.platformsearched = datap;
        getobject.platdescription = $("#platformid :selected").val(); 

        // if (getobject.genresearched === "noneSelected") {
        //     getobject.genresearched = undefined;
        // }

        // if (getobject.platformsearched === "noneSelected") {
        //     getobject.platformsearched = undefined;
        // }

        getobject.key = getobject.namesearched + "," + getobject.genresearched + "," + getobject.platformsearched;

        getobjectArray.unshift(getobject);

        if (getobjectArray.length > 3) {
            getobjectArray.pop();
        }

        localStorage.setItem(SAVE_INFO_KEY, JSON.stringify(getobjectArray));
    }

    // the 2nd then of getGames from RAWG 
    // as you loop through, the chicken coop API gets called asynchronously
    function getChickenCoopInfo() {
        for (var i = 0; i < listOfGames.length; i++) {
            var item = listOfGames[i];
            var name = item.name;
            CallChickenCoop(name);
        }
    }

    // call the ChickenCoop API
    function CallChickenCoop(nameOfTheVideoGame) {
        var queryURL = buildURL(nameOfTheVideoGame);
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: headerParams
        }).then(calledCC);
    }

    // the "then" of having called the ChickenCoop API
    // this function gets popped off the stack as program control returns
    function calledCC(response) {
        var debug = 0;
        var item = response.result;
        PagesProcessed++;

        if (item !== null && !item.toString().includes("No result")) {
            var gotdata = Object.create(chickenCoopDataObject);
            var itemgames = findGame(item.title);

            gotdata.games = itemgames; // could be null

            gotdata.description = item.description;
            gotdata.genre = item.genre;
            gotdata.image = item.image;
            gotdata.publisher = item.publisher;
            gotdata.rating = item.rating;
            gotdata.score = item.score;
            gotdata.title = item.title;

            listOfChickens.push(gotdata);

            populateUsingCriteria(gotdata);
        }

        // you're done popping off the stack. Do processing that goes after
        if (PagesProcessed >= listOfGames.length) {
            if (clickedSearchButton) {
                saveLocalStorage();
                PopulateLastSearches();
                clickedSearchButton = false;
            }
            var searchid = $("#searchid");
            searchid.val("");
        }
    }

    // the then of having called RAWG games
    function calledGetGames(response) {
        var result = response.results;
        listOfGames = [];
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var gamesObject1 = Object.create(gamesObject);
            gamesObject1.id = item.id;
            gamesObject1.name = item.name;
            gamesObject1.released = item.released;
            if (item.clip !== null) {
                gamesObject1.pic = item.clip.clip;
            }

            gamesObject1.index = i; // put into chickenCoop when ready
            listOfGames.push(gamesObject1);
        }
    }

    // RAWG games url
    function buildGamesURL(search, genres, platforms, selectedsearch, selectedgenre, selectedplatform) {

        var url = queryGamesRAWG;

        if (selectedsearch) {
            url += "&search=" + search;
        }

        if (selectedgenre) {
            url += "&genres=" + genres;
        }

        if (selectedplatform) {
            url += "&platforms=" + platforms;
        }

        return url;
    }

    // call API that gets platforms
    function getListOfPlatforms(platformurl) {
        $.ajax({
            url: platformurl,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetPlatforms);
    }

    // the then of getPlatforms
    function calledGetPlatforms(response) {
        var result = response.results;

        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var platformObject1 = Object.create(platformObject);
            platformObject1.id = item.id;
            platformObject1.name = item.name;

            listOfPlatforms.push(platformObject1);
        }

        if (response.next !== null) {
            getListOfPlatforms(queryURLRAWGPlatform + "page=2");
        }

        // have to do this due to asynchronous programming of js
        if (response.next === null) {
            displayPlatformToScreen();
        }
    }

    // get genres from RAWG
    function getListOfGenres(genreurl) {
        $.ajax({
            url: genreurl,
            method: "GET",
            headers: headerParamsRAWG
        }).then(calledGetGenres);
    }

    // the then of getGenres
    function calledGetGenres(response) {
        var result = response.results;

        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            var genreObject1 = Object.create(genreObject);
            genreObject1.id = item.id;
            genreObject1.name = item.name;

            listOfGenres.push(genreObject1);
        }

        displayGenreToScreen();
    }

    // build chickenCoop url
    function buildURL(nameOfTheVideoGame) {
        var sampleVideo = "Rise of the Tomb Raider";
        var encoded = encodeURIComponent(/*sampleVideo*/ nameOfTheVideoGame);
        var queryURL = chickenCoopURL + encoded + "?";
        return queryURL;
    }

    // this bridges the gap between RAWG and ChickenCoop: search for the name of the game
    function findGame(chickenTitle) {
        var game = null;
        for (var i = 0; i < listOfGames.length; i++) {

            if (listOfGames[i].name.includes(chickenTitle)) {
                game = listOfGames[i];
                break;
            }
        }

        return game;
    }

    // populate results
    function populateUsingCriteria(gotdata) {

        var getul = $("#resultsList");
        var makeli = $("<li>");
        var video = $("<video>");

        var name = "";
        var pic = "";
        if (gotdata.games !== null) {
            name = gotdata.games.name;
            pic = gotdata.games.pic;
        }

        makeli.text(name);
        //makeli.attr("style", "margin-top: 2px;");
        makeli.appendTo(getul);

        if (pic !== "") {
            video.attr("src", pic);
            video.attr("width", 200);
            video.attr("height", 200);
            video.attr("controls", "controls");
            video.appendTo(getul);
        }
    }

    $("#searchNow").on("click", searchButtonClicked);
    //$(".recentlySearchedClass").on("click", searchRecentButton);
    getListOfPlatforms(queryURLRAWGPlatform);
    getListOfGenres(queryURLRAWGGenre);
    PopulateLastSearches();
});