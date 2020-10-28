
# Project 1--Video Game Suggester

## Screenshot:

![Video Game Selector](https://github.com/dgibbs8089/Project_1_develop/blob/Develop_Branch/assets/images/Screenshot.PNG)


Welcome to the web site that suggests the names of great video games based on three things: keywords, a platform, and a genre.  Using custom-made CSS, this interactive web app consumes two server-side APIs to first retrieve up to 5 names of video games that the user probably would be interested in.  It uses another API to retrieve more information about each video game returned from the first API call.  

The first API call uses the RAWG Video Games Database API to collect information, including titles, of up to 5 video games.  Then, for each video game returned, a call to the ChickenCoop API is made, in order to fulfill the requirement that this app use at least two server-side APIs.  RAWG does return plenty of information, by itself.  

The user enters keywords in a textbox.  These keywords are used as one of the three parameters.  It is entered as a parameter to the RAWG call.  

The user may select the genre she's interested in.  All genres known to RAWG are listed in a combobox.

The user may select the platform she uses, or is otherwise interested in.  

The app requires only that one of the three criteria be used. The user must select at least one option in order to trigger the search.

The user then clicks the Search button to get a list of up to 5 sets of information about each video game: the title, the description, and possibly the following two, if they're available: the rating and a video clip.  

A list of most recently searched-for names is stored in local storage, as a list of buttons.  The user may select a recent search instead of typing in the information.

The information is displayed in card format, with an image representing the video game at the top of the card, followed by information in text format, followed by, possibly, a video clip.  

## Responsiveness

This web app is responsive. You can view it on a large screen or a tiny phone screen.

## Link to Deployed Application:

[Link to Video Game App](https://mariothompson0010.github.io/Project_1_develop/index.html)


