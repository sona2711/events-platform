import type { Rule } from 'antd/es/form'
import type { TFunction } from 'i18next'

export const PROFILE_FORM_FIELDS = {
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  location: 'location',
  preferredLanguage: 'preferredLanguage',
} as const

export const ARMENIA_REGION_OPTIONS = [
  { value: 'Yerevan', label: 'Yerevan' },
  { value: 'Aragatsotn', label: 'Aragatsotn' },
  { value: 'Ararat', label: 'Ararat' },
  { value: 'Armavir', label: 'Armavir' },
  { value: 'Gegharkunik', label: 'Gegharkunik' },
  { value: 'Kotayk', label: 'Kotayk' },
  { value: 'Lori', label: 'Lori' },
  { value: 'Shirak', label: 'Shirak' },
  { value: 'Syunik', label: 'Syunik' },
  { value: 'Tavush', label: 'Tavush' },
  { value: 'Vayots Dzor', label: 'Vayots Dzor' },
] as const

const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,20}$/

export const isValidPhoneNumber = (value: string): boolean => {
  const trimmed = value.trim()

  if (!PHONE_PATTERN.test(trimmed)) {
    return false
  }

  const digitCount = trimmed.replace(/\D/g, '').length

  return digitCount >= 7 && digitCount <= 15
}

export const getProfileFormRules = (t: TFunction<'profile'>): Record<string, Rule[]> => ({
  email: [
    { required: true, message: t('form.validation.required') },
    { type: 'email', message: t('form.validation.email') },
  ],
  phone: [
    { required: true, message: t('form.validation.required') },
    {
      validator: (_rule, value: string) => {
        if (!value || isValidPhoneNumber(value)) {
          return Promise.resolve()
        }

        return Promise.reject(new Error(t('form.validation.phone')))
      },
    },
  ],
  location: [{ required: true, message: t('form.validation.required') }],
})
