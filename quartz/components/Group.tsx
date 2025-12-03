import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  title?: string
  children: any[]
}

const Group: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps & { opts: Options }) => {
  const opts = cfg.opts as Options

  return (
    <div class="bordered-wrapper">
      {opts.title && <h3 class="group-title">{opts.title}</h3>}
      {opts.children.map((Child, i) => (
        <div key={i}>{Child}</div>
      ))}
    </div>
  )
}

export default (() => Group) satisfies QuartzComponentConstructor
