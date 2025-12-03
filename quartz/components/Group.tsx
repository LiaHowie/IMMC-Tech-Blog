import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  title?: string
  children: any[]
}

const Group: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.title
  const children = cfg?.children ?? []

  return (
    <div class="bordered-wrapper">
      {title && <h3 class="group-title">{title}</h3>}
      {children.map((Child, i) => (
        <div key={i}>{Child}</div>
      ))}
    </div>
  )
}

export default (() => Group) satisfies QuartzComponentConstructor
