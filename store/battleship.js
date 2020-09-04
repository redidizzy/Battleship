export const state = () => ({
    actualPlayerShips: [],
    opponentPlayerShips: [],
    appState: null,
    newShipDirection: 'horizontal'
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
    }
}
export const actions = {
    startGame({ commit }) {
        commit('changeAppState', 'init')
    },
    addShip({ commit, state }, coordinates) {
        if (state.appState == 'init' &&
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
    }
}

function noCollidingShip(ships, coordinates, direction) {
    return !ships.find(ship => ship.coordinates[0] == coordinates[0] && ship.coordinates[1] == coordinates[1]) &&
           !(direction=='horizontal' &&  (ships.find(ship => ship.coordinates[0] == coordinates[0]+1 && ship.coordinates[1] == coordinates[1]) || coordinates[0] == 8)) &&
           !(direction=='vertical' &&  (ships.find(ship => ship.coordinates[0] == coordinates[0] && ship.coordinates[1] == coordinates[1] +1) || coordinates[1] == 8))
}