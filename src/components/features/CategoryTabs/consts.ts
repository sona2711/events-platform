import {
  AppstoreOutlined,
  BankOutlined,
  FormatPainterOutlined,
  MoonOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import { createElement } from 'react'
import { DumbbellIcon, FoodDrinkIcon } from './icons'
import type { CategoryTabItem } from './types'

export const CATEGORY_TAB_ITEMS: CategoryTabItem[] = [
  {
    id: 'all',
    label: 'All',
    icon: createElement(AppstoreOutlined),
  },
  {
    id: 'music',
    label: 'Music',
    icon: createElement(SoundOutlined),
  },
  {
    id: 'food-drink',
    label: 'Food & Drink',
    icon: createElement(FoodDrinkIcon),
  },
  {
    id: 'arts',
    label: 'Arts',
    icon: createElement(FormatPainterOutlined),
  },
  {
    id: 'nightlife',
    label: 'Nightlife',
    icon: createElement(MoonOutlined),
  },
  {
    id: 'health',
    label: 'Health',
    icon: createElement(DumbbellIcon),
  },
  {
    id: 'business',
    label: 'Business',
    icon: createElement(BankOutlined),
  },
]
