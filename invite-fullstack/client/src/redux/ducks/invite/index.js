import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

const GET_GOING = "invite/GET_GOING"
const GET_NOTGOING = "invite/GET_NOTGOING"
const GET_USER = "invite/GET_USER"

const initialSate = {
  going: [],
  notgoing: [],
  user: {},
  goingCount: 0,
  notGoingCount: 0
}

export default (state = initialSate, action) => {
  switch (action.type) {
    case GET_GOING:
      return { ...state, going: action.payload }
    case GET_NOTGOING:
      return { ...state, notgoing: action.payload }
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        goingCount: action.payload.goingCount,
        notGoingCount: action.payload.notGoingCount
      }
    default:
      return state
  }
}

function getGoing() {
  return dispatch => {
    axios.get("/api/going").then(resp => {
      dispatch({
        type: GET_GOING,
        payload: resp.data
      })
    })
  }
}

function getNotGoing() {
  return dispatch => {
    axios.get("/api/notgoing").then(resp => {
      dispatch({
        type: GET_NOTGOING,
        payload: resp.data
      })
    })
  }
}

function getUser() {
  return dispatch => {
    axios.get("/api/user").then(resp => {
      dispatch({
        type: GET_USER,
        payload: {
          goingCount: resp.data.goingCount,
          notGoingCount: resp.data.notGoingCount,
          user: resp.data.user
        }
      })
    })
  }
}

function markInvitee(user, going) {
  return dispatch => {
    axios
      .post("/api/mark-invitee", { user, going })
      .then(resp => {
        dispatch(getUser())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function useInvite() {
  const dispatch = useDispatch()
  const going = useSelector(appState => appState.inviteState.going)
  const notgoing = useSelector(appState => appState.inviteState.notgoing)
  const fetchGoing = () => dispatch(getGoing())
  const fetchNotGoing = () => dispatch(getNotGoing())
  const fetchUser = () => dispatch(getUser())
  const goingCount = useSelector(appState => appState.inviteState.goingCount)
  const markUser = (user, going) => dispatch(markInvitee(user, going))
  const notGoingCount = useSelector(
    appState => appState.inviteState.notGoingCount
  )
  const user = useSelector(appState => appState.inviteState.user)
  return {
    going,
    notgoing,
    fetchGoing,
    fetchNotGoing,
    fetchUser,
    goingCount,
    notGoingCount,
    user,
    markUser
  }
}
