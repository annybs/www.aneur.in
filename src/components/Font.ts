export interface FontState {
  url: string
}

export default function Font(): FontState {
  const url = `//${document.location.host}/assets/IosevkaCustom@30.3.0/style.css`

  return {
    url,
  }
}
