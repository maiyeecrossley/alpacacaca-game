# Alpacacaca

<img src="screenshots/Screenshot%202024-12-18%20at%2011.37.39.png" alt="screenshot image of Alpacacaca name, brown alpaca, and a 'start game' button">


## Description

<img src="screenshots/Screenshot 2024-12-20 at 09.51.15.png" width="300" alt="screenshot image of the gameplay with grass and water rows">

Alpacacaca is a game that takes on the original 1981 Frogger arcade game.
The idea of the game is to guide the alpaca to the top of the flowery field, crossing over the river of logs, and avoiding the herd of cows on the field.

## How to play

The game requires the player to use WASD keys on the keyboard, as the directional keys to move the alpaca. 
W = up, A = left, S = down, D = right. 

The player has 30 seconds and 3 sets of lives, to guide the alpaca towards the top of the board, where the 'safe' grass field is.

The alpaca starts at the bottom of the board in a grass field, and the player has to guide it through the moving obstacles.

The moving logs in the water can help the alpaca cross it so it can safely land onto a grass field. 

<img src="screenshots/Screenshot 2024-12-20 at 09.53.22.png" alt="screenshot of game in play with the alpaca standing on a log">

However, if the alpaca misses the logs, and enters the water, then a life is lost.

<img src="screenshots/Screenshot 2024-12-20 at 09.53.47.png" alt="screenshot of game in play with the alpaca in the water">

Similarly if the alpaca also runs into the herd of cows, then a life will be lost.

<img src="screenshots/Screenshot 2024-12-20 at 09.53.38.png" alt="screenshot of game in play with the alpaca in the same grid cell as a cow">

If the alpaca enters the water, or gets hit by a cow, then it will return to a random start position at the bottom row of the board for the player to try again, whilst the remaining time is still ticking away.

If the player can successfully guide the alpaca across the way, then the game is won.
However, if the timer runs out, then it's game over, and the player will have the opportunity to try again, with all the stats reset.

## Time Frame

The project took one week from day of planning with pseudocode, leading up to deployment day. This project was done independently by myself.

## Tech Stack
- JavaScript
- HTML
- CSS
- Terminal
- GitHub pages for deployment via GitHub actions

## Planning

During the planning stage, I started off creating wireframes of the game that I would like it to look. As the planning continued, I included some pseudocode within the wireframes to easily guide me during the actual coding process.

<img src="screenshots/Screenshot 2024-12-16 at 09.18.43.png" width="300" alt="screenshot of grid with cows and logs">
<img src="screenshots/Screenshot 2024-12-20 at 11.24.59.png" alt="screenshot of wireframe planning, displaying multiple grids with labels to show the elements of the game">

Once the initial idea was illustrated, it gave me a good starting point to write out more pseudocode. 



## Build Process

- started off with creating the grid in JavaScript so the game could load on start
- 

### Challenges

#### Challenge #1 
When deploying the moving assets onto CSS, the images would load over the background layers of my grass and water tiles, however, it contained a solid white background instead of being transparent, despite the gif file already having the transparent background. 

```ruby
.water {
    background-image: url("../assets/images/water_tile.png");
    background-size: cover;
    background-repeat: repeat;
}

.alpaca {
    background-image: url("../assets/images/alpaca_down.gif");
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;

}
```
<img src="screenshots/Screenshot%202024-12-18%20at%2011.29.08.png" alt="image of cows on the grid with a white background behind the cow"><br><br>

My initial thought was to have multiple grids in a stack, whereby one grid would be for background images (ie grass and water tiles), a grid for the movement of the alpaca, and another for the moving background assets.
But this would have been too complicated to execute due to the time frame of the project.

So to overcome this, I used the ::after Pseudo-Element in my CSS for the moving assets, which layers the div elements in my CSS to hide the white background of the moving assets.

```ruby
div.water {
    position: relative;
    background-image: url("../assets/images/water_tile.png");
    background-size: cover;
    background-repeat: repeat;
}

div.alpaca::after {
    content: " ";
    background-image: url("../assets/images/alpaca_down.gif");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
```
<img src="screenshots/Screenshot%202024-12-18%20at%2011.32.17.png" alt="image of cows on the grid without a transparent background behind the cow"><br><br>

#### Challenge #2

Another challenge I came across was the spawning of the cows and logs over the grid, whilst creating the illusion of them moving across.

The initial idea I had was to create a nested array of the cell positions for each row on the grid, for the moving obstacles to be present in. Then create a 'for-each' loop to iterate through the indices of the positions. However, this made the moving obstacles wrap through the grid, and did not correspond to the logic of 'cows on the grass' and 'logs on the water'. 
So instead of looping through the array of multiple cell positions per row, I decided to test it by hardcoding an array of a few consecutive cell positions, and iterate through that instead.



 

## Wins

- The overall look of the game with the assets
- Developed further understanding and logic of looping through objects
- The whole project itself, the idea of making something out of nothing

## Key Learnings

- Confident in using command line to utilise the use of GitHub
- Testing and de-bugging own work
- Being able to use JS, HTML and CSS in unity

## Bugs

## Future Improvements

- Cows and logs moving in different directions
- Different map layouts
- Multiple levels of increasing difficulty
- Two player vs mode
- Endless mode
- Background audio
- Mix of images for more appealing appearance

## Resources
- [Frogger Wikipedia](https://en.wikipedia.org/wiki/Frogger)


#### Assets Attributions:

- [itch.io - Hana Caraka Animals Pack](https://otterisk.itch.io/hana-caraka-animals-pack)
- [itch.io - Sprout Lands by Cup Nooble](https://cupnooble.itch.io/sprout-lands-asset-pack)
- [itch.io - Adventure Music Pack](https://monsieur-fred.itch.io/adventure-music-pack)


#### Tools
- [Excalidraw - to draw out wire frames](https://excalidraw.com/)
- [EZGif - Online gif maker and image editor](https://ezgif.com/)
- [Google Fonts - Lilita One](https://fonts.google.com/specimen/Lilita+One)
