type Props = {
  className: string
  width?: string
  height?: string
}

export default function GreenChecked(props: Props) {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="#fff" stroke="#2ca02c" strokeWidth="2.3">
        <circle cx="10" cy="10" r="8.5" />
        <path d="M5.2,10 8.5,13.4 14.8,7.2" />
      </g>
    </svg>
  )
}
