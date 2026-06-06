import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import type { ProfileFormValues } from '@/pages/userProfile/types'
import { ARMENIA_REGION_OPTIONS, getProfileFormRules, PROFILE_FORM_FIELDS } from './consts'
import type { ProfileDetailsFormProps } from './types'
import styles from './styles.module.css'

export const ProfileDetailsForm = ({
  profile,
  languageOptions,
  onSave,
}: ProfileDetailsFormProps) => {
  const { t } = useTranslation('profile')
  const [form] = Form.useForm<ProfileFormValues>()
  const [isEditing, setIsEditing] = useState(false)
  const formRules = useMemo(() => getProfileFormRules(t), [t])

  const handleEditToggle = () => {
    setIsEditing(true)
  }

  const handleFinish = (values: ProfileFormValues) => {
    onSave?.(values)
    setIsEditing(false)
  }

  return (
    <section className={styles.card} aria-labelledby="profile-details-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="profile-details-title">
          {t('form.title')}
        </h2>
        {!isEditing ? (
          <button type="button" className={styles.editButton} onClick={handleEditToggle}>
            <EditOutlined aria-hidden />
            {t('form.editDetails')}
          </button>
        ) : null}
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          preferredLanguage: profile.preferredLanguage,
        }}
        onFinish={handleFinish}
      >
        <div className={styles.formGrid}>
          <Form.Item name={PROFILE_FORM_FIELDS.fullName} label={t('form.fields.fullName')}>
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            name={PROFILE_FORM_FIELDS.email}
            label={t('form.fields.email')}
            rules={formRules.email}
          >
            <Input type="email" disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            name={PROFILE_FORM_FIELDS.phone}
            label={t('form.fields.phone')}
            rules={formRules.phone}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            name={PROFILE_FORM_FIELDS.location}
            label={t('form.fields.location')}
            rules={formRules.location}
          >
            <Select disabled={!isEditing} options={[...ARMENIA_REGION_OPTIONS]} />
          </Form.Item>

          <Form.Item
            name={PROFILE_FORM_FIELDS.preferredLanguage}
            label={t('form.fields.preferredLanguage')}
          >
            <Select disabled={!isEditing} options={languageOptions} />
          </Form.Item>
        </div>

        {isEditing ? (
          <div className={styles.footer}>
            <Button type="primary" htmlType="submit">
              {t('form.saveChanges')}
            </Button>
          </div>
        ) : null}
      </Form>
    </section>
  )
}
