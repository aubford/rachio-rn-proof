import { defaults } from './styles/web'

export function stl(){
  let args = [...arguments]
  let styles = {}

  args.forEach(function(e){
    styles = { ...styles, ...e }
  })

  return { ...defaults, ...styles}
}
