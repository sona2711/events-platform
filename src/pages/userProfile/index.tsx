import { useMemo, useState } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { saveReminder } from '@/components/features/UpcomingEventAlert/utils'
import { ProfileDetailsForm } from '@/components/features/ProfileDetailsForm'
import { UpcomingEventAlert } from '@/components/features/UpcomingEventAlert'
import { UserBookingsPanel } from '@/components/features/UserBookingsPanel'
import { UserProfileSidebar } from '@/components/features/UserProfileSidebar'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectProfile, setAvatarUrl, updateProfileDetails } from '@/store/profile'
import { isValidAvatarFile, readFileAsDataUrl } from './avatarUtils'
import type { ProfileFormValues, ProfileNavItemId } from './types'
import { useProfilePageData } from './utils'
import styles from './styles.module.css'

export const UserProfilePage = () => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const { profileNavItemIds, upcomingBookings, pastBookings, cancelledBookings, languageOptions } =
    useProfilePageData()
  const [activeSection, setActiveSection] = useState<ProfileNavItemId>('bookings')

  const handleAvatarImageSelect = async (file: File) => {
    if (!isValidAvatarFile(file)) {
      return
    }

    const dataUrl = await readFileAsDataUrl(file)
    dispatch(setAvatarUrl(dataUrl))
  }

  const handleProfileSave = (values: ProfileFormValues) => {
    dispatch(updateProfileDetails(values))
  }

  const profileFormKey = `${profile.fullName}-${profile.email}-${profile.phone}-${profile.preferredLanguage}`

  const nextUpcomingBooking = upcomingBookings[0]

  const handleSetReminder = (bookingId: string) => {
    saveReminder(bookingId)
    message.success(t('alert.reminderSet'))
  }

  const navItems = useMemo(
    () =>
      profileNavItemIds.map((id) => ({
        id,
        isActive: id === activeSection,
      })),
    [activeSection, profileNavItemIds],
  )

  const renderMainContent = () => {
    switch (activeSection) {
      case 'bookings':
        return (
          <UserBookingsPanel
            upcomingBookings={upcomingBookings}
            pastBookings={pastBookings}
            cancelledBookings={cancelledBookings}
          />
        )
      case 'settings':
        return (
          <ProfileDetailsForm
            key={profileFormKey}
            profile={profile}
            languageOptions={languageOptions}
            onSave={handleProfileSave}
          />
        )
      case 'saved':
        return (
          <section className={styles.placeholderPanel} aria-labelledby="profile-saved-title">
            <h2 className={styles.placeholderTitle} id="profile-saved-title">
              {t('sections.saved.title')}
            </h2>
            <p className={styles.placeholderText}>{t('sections.saved.description')}</p>
          </section>
        )
      case 'feedback':
        return (
          <section className={styles.placeholderPanel} aria-labelledby="profile-feedback-title">
            <h2 className={styles.placeholderTitle} id="profile-feedback-title">
              {t('sections.feedback.title')}
            </h2>
            <p className={styles.placeholderText}>{t('sections.feedback.description')}</p>
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <UserProfileSidebar
          profile={profile}
          navItems={navItems}
          onNavItemClick={setActiveSection}
          onAvatarImageSelect={handleAvatarImageSelect}
        />
        <UpcomingEventAlert booking={nextUpcomingBooking} onSetReminder={handleSetReminder} />
      </div>

      <div className={styles.main}>{renderMainContent()}</div>
    </div>
  )
}
