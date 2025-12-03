import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  class?: string
  title?: string
  children: QuartzComponentConstructor<any>[]
}

const Group: QuartzComponentConstructor<Options> = (opts: Options) => {
  return (props: QuartzComponentProps) => {
    // render children by calling each child with props
    const renderedChildren = opts.children.map((Child) => Child(props))

    return (
      <div class={opts.class ?? ""}>
        {opts.title && <h3 class="group-title">{opts.title}</h3>}
        {renderedChildren}
      </div>
    )
  }
}

export default Group
