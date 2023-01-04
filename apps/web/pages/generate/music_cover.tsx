import { useRouter } from "next/router"
import { MusicCover } from "../../components/MusicCover"

export function GenerateMusicCover() {
  const { query: { name, image, author, quote } } = useRouter()
  return (
    <MusicCover
      name={name as string}
      image={image as string}
      author={author as string}
      quote={quote as string}
    />
  )
}

export default GenerateMusicCover