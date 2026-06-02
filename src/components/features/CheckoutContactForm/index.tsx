import { useCallback, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { isValidContactValues } from '@/pages/checkout/utils'
import type { CheckoutContactValues } from '@/pages/checkout/types'
import { CONTACT_FORM_FIELDS } from './consts'
import type { CheckoutContactFormProps } from './types'
import styles from './styles.module.css'

export const CheckoutContactForm = ({ initialValues, onValidChange }: CheckoutContactFormProps) => {
  const { t } = useTranslation('checkout')
  const [form] = Form.useForm<CheckoutContactValues>()

  const emitValidValues = useCallback(() => {
    const values = form.getFieldsValue()
    onValidChange(isValidContactValues(values) ? values : null)
  }, [form, onValidChange])

  useEffect(() => {
    emitValidValues()
  }, [emitValidValues])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={emitValidValues}
      onFinish={emitValidValues}
    >
      <div className={styles.formGrid}>
        <Form.Item
          name={CONTACT_FORM_FIELDS.fullName}
          label={t('contact.fields.fullName')}
          rules={[
            { required: true, message: t('contact.validation.fullNameRequired') },
            { min: 2, message: t('contact.validation.fullNameMin') },
          ]}
        >
          <Input onBlur={emitValidValues} />
        </Form.Item>

        <Form.Item
          name={CONTACT_FORM_FIELDS.email}
          label={t('contact.fields.email')}
          rules={[
            { required: true, message: t('contact.validation.emailRequired') },
            { type: 'email', message: t('contact.validation.emailInvalid') },
          ]}
        >
          <Input type="email" onBlur={emitValidValues} />
        </Form.Item>
      </div>
    </Form>
  )
}
