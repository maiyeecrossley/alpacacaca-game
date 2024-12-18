# Alpacacaca

![Alpacacaca](screenshots/Screenshot%202024-12-18%20at%2011.37.39.png)

This is the README for my **Alpacacaca** game.

## Description

![Alpcacaca](screenshots/Screenshot%202024-12-17%20at%2009.20.48.png)

Alpacacaca is a game that takes on the original 1981 Frogger arcade game.
The idea of the game is to guide the alpaca to the top of the flowery field, crossing over the river of logs, and avoiding the herd of cows on the field.

## Build Process


### Challenges
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
![Screenshot of before the change](screenshots/Screenshot%202024-12-18%20at%2011.29.08.png)

My initial thought was to have multiple grids in a stack, whereby one grid would be for background images (ie grass and water tiles), a grid for the movement of the alpaca, and another for the moving background assets.
But this would have been too complicated to execute due to the time frame of the project.

So to overcome this challenge, I used the ::after Pseudo-Element in my CSS for the moving assets, which layers the div elements in my CSS to hide the white background of the moving assets.

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
![Screenshot of after the change](screenshots/Screenshot%202024-12-18%20at%2011.32.17.png)


## Resources
- [Frogger Wikipedia](https://en.wikipedia.org/wiki/Frogger)

## Technologies Used
- JavaScript
- HTML
- CSS


#### Assets Attributions:

- [itch.io - Hana Caraka Animals Pack](https://otterisk.itch.io/hana-caraka-animals-pack)
- [itch.io - Sprout Lands by Cup Nooble](https://cupnooble.itch.io/sprout-lands-asset-pack)
- [itch.io - Adventure Music Pack](https://monsieur-fred.itch.io/adventure-music-pack)


#### Tools
- [Excalidraw - to draw out wire frames](https://excalidraw.com/)
- [EZGif - Online gif maker and image editor](https://ezgif.com/)
- [Google Fonts - Lilita One](https://fonts.google.com/specimen/Lilita+One)
