export type EventCardItem = {
  id: number
  title: string
  category: string
  location: string
  date: string
  price: string
  image: string
}

export type SliderBreakpointConfig = Record<
  number,
  {
    slidesPerView: number
    spaceBetween: number
  }
>
