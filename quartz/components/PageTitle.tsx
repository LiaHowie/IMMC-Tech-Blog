import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    
    <h2 class={classNames(displayClass, "page-title")} style="text-align: center">
      <a href={baseDir}>
        <img 
          src="https://drive.liahowie.net/index.php/apps/files_sharing/publicpreview/sr2HBeWopTqJNDT?file=/&fileId=61807&x=2560&y=1440&a=true&etag=da515ff53477a12ddcd01be8efa78b2c" 
          width="100" 
          height="100"
          >
        </img>
        <br></br>
        {title}
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
