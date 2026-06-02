import type { LanguageOption, ProfileFormValues, UserProfile } from '@/pages/userProfile/types'

export type ProfileDetailsFormProps = {
  profile: UserProfile
  languageOptions: LanguageOption[]
  onSave?: (values: ProfileFormValues) => void
}
