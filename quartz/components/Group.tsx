import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  class?: string
  title?: string
  children: any[]
}

const Group: QuartzComponentConstructor<Options> = (opts: Options) => {
  return function renderGroup(props: QuartzComponentProps) {
    return (
      <div class="bordered-wrapper">
        {opts.title && <h3 class="group-title">{opts.title}</h3>}
        {opts.children.map((Child, i) => (
          <div key={i}>{Child(props)}</div>
        ))}
      </div>
    )
  }
}

export default Group
