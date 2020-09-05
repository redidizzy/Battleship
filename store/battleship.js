
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
    addActualPlayerAttacksCoordinates(state, coordinates){
        state.addActualPlayerAttacksCoordinates.push({coordinates})
    },
    addOpponentPlayerAttacksCoordinates(state, coordinates){
        state.addOpponentPlayerAttacksCoordinates(coordinates)
    },
    changeResult(state, result){
        state.result = result
    }
}
export const actions = {
    initGame({ commit }) {
        commit('changeAppState', 'init')
    },
    async startGame({ commit }, {gridSize}) {
        try {
            const payload = {
                size: gridSize
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
    async attack({commit}, coordinates) {
        if(state.appState==='playing'){
            try{
                const identifier = localStorage.getItem('current-game-id')
                const payload = {coordinates, identifier}
                const response = await axios.post('/attack', payload)
                commit('addActualPlayerAttacksCoordinates', coordinates)
                commit('addOpponentPlayerAttacksCoordinates', response.data.opponentCoordinates)
                if(response.data.finished){
                    commit('changeAppState', 'finished')
                    commit('changeResult', response.data.result)
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