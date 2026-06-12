import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadPaidEventIdsFromStorage } from './paidBookingsStorage'

export { savePaidEventIdsToStorage } from './paidBookingsStorage'

type PaidBookingsState = { eventIds: string[] }

const initialState: PaidBookingsState = { eventIds: loadPaidEventIdsFromStorage() }

const paidBookingsSlice = createSlice({
  name: 'paidBookings',
  initialState,
  reducers: {
    markAsPaid: (state, action: PayloadAction<string>) => {
      if (!state.eventIds.includes(action.payload)) {
        state.eventIds.push(action.payload)
      }
    },
  },
})

export const { markAsPaid } = paidBookingsSlice.actions
export const paidBookingsReducer = paidBookingsSlice.reducer

type PaidBookingsRootState = { paidBookings: PaidBookingsState }

export const selectPaidEventIds = (state: PaidBookingsRootState): string[] =>
  state.paidBookings.eventIds
