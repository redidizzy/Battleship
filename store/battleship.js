
import axios from '~/plugins/axios'
export const state = () => ({
    actualPlayerShips: [],
    appState: null,
    newShipDirection: 'horizontal',
    actualPlayerAttacks: [],
    opponentPlayerAttacks: [],
    result : null,
})
export const mutations = {
    placeActualPlayerShip(state, coordinates) {
        state.actualPlayerShips.push({
            coordinates: coordinates,
            alignment: state.newShipDirection
        })
    },
    changeAppState(state, value) {
        //@todo Verify if state is an accepted value

        state.appState = value
    },
    changeNewShipDirection(state, value) {
        state.newShipDirection = value
    },
    addActualPlayerAttacksCoordinates(state, attack){
        state.actualPlayerAttacks.push(attack)
    },
    addOpponentPlayerAttacksCoordinates(state, attack){
        state.opponentPlayerAttacks.push(attack)
    },
    changeResult(state, result){
        state.result = result
    }
}
export const actions = {
    initGame({ commit }) {
        commit('changeAppState', 'init')
    },
    async startGame({ commit, state}, {gridSize}) {
        try {
            const payload = {
                size: gridSize,
                playerShips: state.actualPlayerShips
            }
            const response = await axios.post('/create-game', payload)
            localStorage.setItem('current-game-id', response.data.identifier)
            commit('changeAppState', 'playing')
        } catch (error) {
            console.log(error)
        }
    },
    addShip({ commit, state }, coordinates) {
        if (state.appState === 'init' &&
            state.actualPlayerShips.length < 6 &&
            noCollidingShip(state.actualPlayerShips, coordinates, state.newShipDirection)) {
            commit('placeActualPlayerShip', coordinates)
            if (state.newShipDirection == 'horizontal') {
                commit('placeActualPlayerShip', [coordinates[0] + 1, coordinates[1]])
            }
            if (state.newShipDirection == 'vertical') {
                commit('placeActualPlayerShip', [coordinates[0], coordinates[1] + 1])
            }
        }
    },
    /**
     * 
     * @param {commit} param0 : callback to commit a mutation
     * @param {*} coordinates : Coordinates of square to attack
     * This method serves to attack the opponent in the chosen coordinates
     */
    async attack({commit, state}, coordinates) {
        if(state.appState==='playing'){
            if(state.actualPlayerAttacks.find(attack => attack.coordinates[0] == coordinates[0] && attack.coordinates[1] == coordinates[1]) || state.actualPlayerShips.find(ship => ship.coordinates[0] == coordinates[0] && ship.coordinates[1] == coordinates[1])) return ;
            try{
                // First we get the game id and send an ajax request to attack the opponents ships
                const identifier = localStorage.getItem('current-game-id')
                const payload = {coordinates, identifier}
                const response = await axios.post('/attack', payload)

                // We update the attack of the actual players
                commit('addActualPlayerAttacksCoordinates', response.data.playerAttack)
                // We check if the player has won 
                if(response.data.hasPlayerWon){
                    commit('changeAppState', 'finished')
                    commit('changeResult', 'won')
                }else{
                    commit('addOpponentPlayerAttacksCoordinates', response.data.opponentAttack)
                    // If the axios request returns a 'finished' parameter, it means the game is finished
                    // We have to update the app state and the result
                    if(response.data.hasOpponentWon){
                        commit('changeAppState', 'finished')
                        commit('changeResult', 'lost')
                    }
                }

            }catch(error){
                console.log(error)
            }
        }
    }
}

function noCollidingShip(ships, coordinates, direction) {
    return !ships.find(ship => ship.coordinates[0] == coordinates[0] && ship.coordinates[1] == coordinates[1]) &&
        !(direction == 'horizontal' && (ships.find(ship => ship.coordinates[0] == coordinates[0] + 1 && ship.coordinates[1] == coordinates[1]) || coordinates[0] == 8)) &&
        !(direction == 'vertical' && (ships.find(ship => ship.coordinates[0] == coordinates[0] && ship.coordinates[1] == coordinates[1] + 1) || coordinates[1] == 8))
}