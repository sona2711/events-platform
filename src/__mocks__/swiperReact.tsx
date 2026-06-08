import type { ReactNode } from 'react'

type SwiperProps = {
  children?: ReactNode
}

export const Swiper = ({ children }: SwiperProps) => children
export const SwiperSlide = ({ children }: SwiperProps) => children
