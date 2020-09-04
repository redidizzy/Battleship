# Battleship

## Build Setup

### Frontend
First, install everything by running

```
$ yarn install
```
or(if using npm)

```
$ npm install
```

Just run 

```
$ yarn dev
```
or(if using npm)

```
$ npm run dev

```

### Backend

Don't forget to install and run the [Backend](https://github.com/redidizzy/battleship-api)

 
## Configuration
Front end is run on port 3000 by default, to change this behaviour, go to /nuxt.config.js and add this config 
```
export default {
  server: {
    port: <your new port>, // default: 3000
    host: <your new host> // default: localhost
  }
}
```

I've used tailwind

## Some Explanations
### Pages and components
#### index.vue 
The main page is /pages/index.vue
It contains a button to start the game if it's not yet started
And an explanatory div for initializing the ships startup placement(it appears when you click on start)
It also calls the Grid component
#### Grid.vue
/components/Grid.vue
Made using tailwind's grid system
It doesn't have to be a 8*8 grid, the size of the grid is a prop, it can be changed just by changing the prop's value
#### Case.vue
/components/Case.vue
Represents each square of the grid
Is responsible for emitting the click event on a square as well as for displaying the player's ships placement

### State management
To make state communication between Components as clear as possible, i've used "Vuex", which is a Vue state management framework
You can find the global states in the /store/battleship.js file

You will find there 3 exported constants as well as 1 local function

#### state constant
Contains the actual application state variables
- actualPlayerShips is an array that would contain the ships whereabouts, direction(horizontal or vertical) and whether it's damaged or not
- appState is equal to :
    - null if the game hasn't started yet
    - "init" if the player is in the process of placing his ships
    - "playing" if the player is in the middle of a game
    - "finished" if the game is finished
-newShipDirection is a data that describes the direction of the new ship to add (only useful during the "init" appState)

If you want to access the state(for instance, actualPlayerShips) in my component, you need to access it this way :

``` 
this.$store.state.battleship.actualPlayerShips
```

#### mutations constant
Represent the state setters, their sole and only purpose is to change the value of a state variable and nothing else

If you want to call a mutation(for instance changeNewShipDirection) in a component, you need to call it this way

```
this.$store.commit('battleship/changeNewShipDirection')
```
#### actions constant
Represent any other actions that are relative to the state, if you need to do something before or after commiting a mutation, that's where you should do it

If you want to call an action(for instance) in a component, you need to call it this way 
```
this.$store.dispatch('battleship/addShip')
```

#### noCollidingShip function
That's just a helper function to check if the ship you want to put with its coordinates is not colliding with any of the already put ship with taking in consideration the direction of the ship

here is a little representation of how everything is communicating
![Vuex representation](https://vuex.vuejs.org/vuex.png)

[Vue.js docs](https://vuejs.org/v2/guide/)
[Nuxt.js docs](https://nuxtjs.org)
[Vuex docs](https://vuex.vuejs.org)

