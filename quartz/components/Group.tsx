import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface GroupOptions {
  title?: string
  children?: any[] // Quartz components
}

const Group: QuartzComponent = (props: QuartzComponentProps) => {
  const cfg = props.cfg as GroupOptions
  const title = cfg?.title
  const children = cfg?.children ?? []

  return (
    <div class="bordered-wrapper">
      {title && <h3 class="group-title">{title}</h3>}
      {children.map((Child, i) => {
        // Call child if it's a function, otherwise render as-is
        if (typeof Child === "function") {
          return <div key={i}>{Child(props)}</div>
        }
        return <div key={i}>{Child}</div>
      })}
    </div>
  )
}

export default (() => Group) satisfies QuartzComponentConstructor
