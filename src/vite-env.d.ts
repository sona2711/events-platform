/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.JPG' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}
