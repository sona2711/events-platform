import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider, Modal } from 'antd'
import { RegistrationsTable } from './index'
import type { RegistrationItem } from './types'

const SAMPLE_DATA: RegistrationItem[] = [
  {
    id: 'reg-1',
    initials: 'AS',
    fullName: 'Anahit Sargsyan',
    email: 'anahit@email.am',
    category: 'MUSIC',
    eventName: 'Yerevan Jazz Fest',
    dayMonth: 'Oct 24,',
    year: '2026',
    date: '2026-10-24',
    status: 'Active',
  },
  {
    id: 'reg-2',
    initials: 'GA',
    fullName: 'Gevorg Abrahamyan',
    email: 'gev.ab@mail.ru',
    category: 'TECH',
    eventName: 'Armenia IT Forum',
    dayMonth: 'Oct 26,',
    year: '2026',
    date: '2026-10-26',
    status: 'Pending',
  },
  {
    id: 'reg-3',
    initials: 'NM',
    fullName: 'Nare Mkrtchyan',
    email: 'nare@web.am',
    category: 'ARTS',
    eventName: 'Cascade Wine Days',
    dayMonth: 'Oct 22,',
    year: '2026',
    date: '2026-10-22',
    status: 'Cancelled',
  },
]

const renderTable = (
  overrides?: Partial<{
    data: RegistrationItem[]
    selectedIds: Set<string>
    onSelectedIdsChange: (ids: Set<string>) => void
    onCancelSelected: () => void
    onUpdateItem: (item: RegistrationItem) => void
    onCancelItem: (id: string) => void
  }>,
) => {
  const onSelectedIdsChange = overrides?.onSelectedIdsChange ?? jest.fn()
  const onCancelSelected = overrides?.onCancelSelected ?? jest.fn()
  const onUpdateItem = overrides?.onUpdateItem ?? jest.fn()
  const onCancelItem = overrides?.onCancelItem ?? jest.fn()

  return {
    onSelectedIdsChange,
    onCancelSelected,
    onUpdateItem,
    onCancelItem,
    ...render(
      <ConfigProvider>
        <RegistrationsTable
          data={overrides?.data ?? SAMPLE_DATA}
          selectedIds={overrides?.selectedIds ?? new Set()}
          onSelectedIdsChange={onSelectedIdsChange}
          onCancelSelected={onCancelSelected}
          onUpdateItem={onUpdateItem}
          onCancelItem={onCancelItem}
        />
      </ConfigProvider>,
    ),
  }
}

describe('RegistrationsTable', () => {
  it('renders registration rows with user details and total count', () => {
    renderTable()

    expect(screen.getByRole('region', { name: 'Registrations table' })).toBeInTheDocument()
    expect(screen.getByText('Total Registrations')).toBeInTheDocument()
    expect(screen.getByText('(3)')).toBeInTheDocument()
    expect(screen.getByText('Anahit Sargsyan')).toBeInTheDocument()
    expect(screen.getByText('anahit@email.am')).toBeInTheDocument()
    expect(screen.getByText('Gevorg Abrahamyan')).toBeInTheDocument()
    expect(screen.getByText('Showing 1–3 of 3')).toBeInTheDocument()
  })

  it('disables cancel selected when no rows are selected', () => {
    renderTable()

    expect(screen.getByRole('button', { name: 'Cancel Selected' })).toBeDisabled()
  })

  it('enables cancel selected when rows are selected', () => {
    renderTable({ selectedIds: new Set(['reg-1']) })

    expect(screen.getByRole('button', { name: 'Cancel Selected' })).toBeEnabled()
  })

  it('calls onSelectedIdsChange when a row checkbox is toggled', async () => {
    const user = userEvent.setup()
    const { onSelectedIdsChange } = renderTable()

    await user.click(screen.getByLabelText('Select Anahit Sargsyan'))

    expect(onSelectedIdsChange).toHaveBeenCalledWith(new Set(['reg-1']))
  })

  it('calls onCancelSelected when cancel selected is clicked', async () => {
    const user = userEvent.setup()
    const { onCancelSelected } = renderTable({ selectedIds: new Set(['reg-1', 'reg-2']) })

    await user.click(screen.getByRole('button', { name: 'Cancel Selected' }))

    expect(onCancelSelected).toHaveBeenCalledTimes(1)
  })

  it('opens the edit modal with the selected registration details', () => {
    renderTable()

    fireEvent.click(screen.getByRole('button', { name: 'Edit registration for Anahit Sargsyan' }))

    const dialog = screen.getByRole('dialog', { name: 'Edit Registration' })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Full Name')).toHaveValue('Anahit Sargsyan')
    expect(within(dialog).getByLabelText('Email')).toHaveValue('anahit@email.am')
  })

  it('calls onCancelItem after confirming cancellation in the modal', () => {
    const confirmSpy = jest.spyOn(Modal, 'confirm').mockImplementation((config) => {
      config.onOk?.()
      return { destroy: jest.fn(), update: jest.fn() }
    })
    const { onCancelItem } = renderTable()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel registration for Anahit Sargsyan' }))

    expect(confirmSpy).toHaveBeenCalled()
    expect(onCancelItem).toHaveBeenCalledWith('reg-1')

    confirmSpy.mockRestore()
  })

  it('disables cancel action for already cancelled registrations', () => {
    renderTable()

    expect(
      screen.getByRole('button', { name: 'Cancel registration for Nare Mkrtchyan' }),
    ).toBeDisabled()
  })

  it('exports data to csv when export button is clicked', () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

    renderTable()

    fireEvent.click(screen.getByRole('button', { name: 'Export to CSV' }))

    expect(createObjectURLSpy).toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalled()
    expect(revokeObjectURLSpy).toHaveBeenCalled()

    clickSpy.mockRestore()
    createObjectURLSpy.mockRestore()
    revokeObjectURLSpy.mockRestore()
  })
})
