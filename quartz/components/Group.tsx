import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  class?: string
  title?: string
  children: any[]
  visibleOn?: string
}

const Group: QuartzComponentConstructor<Options> = (opts: Options) => {
  return (props: QuartzComponentProps) => (
    <div className={`${opts.visibleOn ?? ""}`}>
      <div class="bordered-wrapper">
        {opts.title && <h3 class="group-title">{opts.title}</h3>}
        {opts.children.map((Child, i) => (
          <div key={i}>{Child(props)}</div>
        ))}
      </div>
    </div>
  )
}

export default Group
