// features/maps/mapSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface MapItem {
  id: string
  [key: string | number]: any
}

interface MapState {
  items: MapItem[]
  isLoading: boolean
}

const initialState: MapState = {
  items: localStorage.getItem('mapShapes') ? JSON.parse(localStorage.getItem('mapShapes')!) : [],
  isLoading: false,
}

const mapSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    getAllMaps: (state) => {
      return state
    },
    getMapById: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((q) => q.id === action.payload)
    },
    addMap: (state, action: PayloadAction<MapItem>) => {
      console.log(action.payload)
      state.items.push(action.payload)
      localStorage.setItem('mapShapes', JSON.stringify(state.items))
    },
    removeMap: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((q) => q.id !== action.payload)
      localStorage.setItem('mapShapes', JSON.stringify(state.items))
    },
    editMap: (state, action: PayloadAction<MapItem>) => {
      const editedItemIndex = state.items.findIndex((item) => action.payload.id === item.id)
      state.items[editedItemIndex] = action.payload
      localStorage.setItem('mapShapes', JSON.stringify(action.payload))
    },
  },
})

export const {getAllMaps, getMapById, addMap, removeMap, editMap} = mapSlice.actions
export default mapSlice.reducer
