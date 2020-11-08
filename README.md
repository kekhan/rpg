# Javascript Role-Playing Game
* http://kerinkhan.me/rpg/index.html
This is a Javascript Role-Playning Game. This Document will show users how to play and create a JS game.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup Repository](#setup)
* [Html5 Canvas Game Setup](#html5_canvas_game_setup)
* [Usage](#usage)
* [Play Guide](#play_guide)
* [Features](#features)
* [Status](#status)


## General info
Javascript Role-Playing Game is a 2d tile map game. The player can collect coins and level up to different maps.

## Technologies
Project is created with:
* Html5 Canvas
* Javascript
* Css3

## Setup
### Setup github repository:
The following steps clone the repositroy locally:

```
$ git clone https://github.com/kekhan/rpg
$ cd rpg/
$ open index.html
```
* open index.html in Chome browser

## Html5 Canvas Game Setup
### Guide to Html5 canvas:
This guide demonstrates Html5 canvas used in a 2d tilemap game. Html5 Canvas is used for visualizations for the web. Canvas allows users to create stunning graphics on the web. Html5 Canvas is used for games. Web developed games can be used without downloading. One advantage of creating games in the web is computer memory. 
  ## SetUp Html5 Canvas
  ### HTML5 File 
  The html5 setup will have the <canvas> tag and the <script> elements. The ```<canvas></canvas>`` tag designates an area in the web page for graphics and images. Javascript code is written inside the <script> element. For our project, you will write the javascript code in a separate js file. Let’s Start!
  * Create a file called index.html.
  * Inside the index.html file, write the following html skeleton code
  ```
<html>
<head>
       <title> Javascript Game </title>
</head>
<body>
</body>
</html>
  ```
* Inside the html file, go to the body tag ```<body></body>```
* In the ```<body>``` tag, write the following two lines of html code:
```
<canvas id=”canvas”></canvas>
<script src=”index.js”></script>
 ```
* Notice the src attribute inside the ```<script>``` tag. The src attribute links the path to the Javascript file.
## Usage
![game](/rpg.png)
Demo:(http://kerinkhan.me/rpg/index.html)
## Play Guide
The following instructions are the game play.
## Features
List of features ready and TODO for future features
### Ready Features
* User can move around map
* User can collect objects
* User can change levels
### TODO
* Create extra maps
* Create documentations for game
* Create a game level
## Status
Project is in development.


