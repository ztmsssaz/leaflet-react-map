// features/maps/mapSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface MapItem {
  id: number
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
    getMapById: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((q) => q.id === action.payload)
    },
    addMap: (state, action: PayloadAction<MapItem>) => {
      state.items.push(action.payload)
      localStorage.setItem('mapShapes', JSON.stringify(state.items))
    },
    removeMap: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((q) => q.id !== action.payload)
      localStorage.setItem('mapShapes', JSON.stringify(state.items))
    },
    editMap: (state, action: PayloadAction<{id: number; name: string}>) => {
      const editedItemIndex = state.items.findIndex((item) => action.payload.id === item.id)
      state.items[editedItemIndex] = {...state.items[editedItemIndex], name: action.payload.name}
      localStorage.setItem('mapShapes', JSON.stringify(state.items))
    },
  },
})

export const {getAllMaps, getMapById, addMap, removeMap, editMap} = mapSlice.actions
export default mapSlice.reducer
