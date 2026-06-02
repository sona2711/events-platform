import { CreditCardOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { isValidPaymentValues, normalizeCardNumber } from '@/pages/checkout/utils'
import type { CheckoutPaymentValues } from '@/pages/checkout/types'
import { PAYMENT_FORM_FIELDS } from './consts'
import { formatCardNumberInput, formatExpiryInput } from './utils'
import type { CheckoutPaymentFormProps } from './types'
import styles from './styles.module.css'

export const CheckoutPaymentForm = ({ onValidChange }: CheckoutPaymentFormProps) => {
  const { t } = useTranslation('checkout')
  const [form] = Form.useForm<CheckoutPaymentValues>()

  const emitValidValues = () => {
    const values = form.getFieldsValue()
    onValidChange(isValidPaymentValues(values) ? values : null)
  }

  return (
    <>
      <Form form={form} layout="vertical" onValuesChange={emitValidValues}>
        <div className={styles.formGrid}>
          <Form.Item
            className={styles.fullWidth}
            name={PAYMENT_FORM_FIELDS.cardNumber}
            label={t('payment.fields.cardNumber')}
            rules={[
              { required: true, message: t('payment.validation.cardNumberRequired') },
              {
                validator: (_, value: string | undefined) => {
                  const digits = normalizeCardNumber(value ?? '')
                  if (digits.length >= 13 && digits.length <= 19) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('payment.validation.cardNumberInvalid')))
                },
              },
            ]}
            normalize={formatCardNumberInput}
          >
            <Input
              placeholder={t('payment.placeholders.cardNumber')}
              suffix={<CreditCardOutlined aria-hidden />}
              onBlur={emitValidValues}
            />
          </Form.Item>

          <Form.Item
            name={PAYMENT_FORM_FIELDS.expiryDate}
            label={t('payment.fields.expiryDate')}
            rules={[
              { required: true, message: t('payment.validation.expiryRequired') },
              {
                pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: t('payment.validation.expiryInvalid'),
              },
            ]}
            normalize={formatExpiryInput}
          >
            <Input
              placeholder={t('payment.placeholders.expiryDate')}
              maxLength={5}
              onBlur={emitValidValues}
            />
          </Form.Item>

          <Form.Item
            name={PAYMENT_FORM_FIELDS.cvv}
            label={t('payment.fields.cvv')}
            rules={[
              { required: true, message: t('payment.validation.cvvRequired') },
              {
                pattern: /^\d{3,4}$/,
                message: t('payment.validation.cvvInvalid'),
              },
            ]}
          >
            <Input
              placeholder={t('payment.placeholders.cvv')}
              maxLength={4}
              onBlur={emitValidValues}
            />
          </Form.Item>
        </div>
      </Form>

      <p className={styles.secureNote}>
        <LockOutlined aria-hidden />
        {t('payment.secureNote')}
      </p>
    </>
  )
}
