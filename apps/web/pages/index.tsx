/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { MusicCover } from "../components/MusicCover";
import { ChangeEvent, FormEvent, MutableRefObject, useEffect, useRef } from "react";

import { useStage } from "../hooks/useStage";

import { Metadata, Stage } from '@stative/interfaces'
import { GlobalLoader } from "../components/GlobalLoader";
import { Layout } from "../components/Layout";

interface State {
  metadata?: Metadata
  musicCoverUrl?: string
  musicCoverFilename?: string
  loading: boolean
  formMusicalCover: {
    author: string
    name: string
    phrase: string
  }
  
}

const initialState: State = {
  metadata: undefined,
  musicCoverUrl: undefined,
  loading: false,
  formMusicalCover: {
    author: 'Author',
    name: 'Song name',
    phrase: ''
  }
}

export function Index() {
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const stage = useStage<State>(initialState)

  useEffect(() => {
    if (stage.state.metadata) {
      stage.commitState({
        ...stage.state,
        formMusicalCover: {
          ...stage.state.formMusicalCover,
          name: stage.state.metadata.title,
        }
      })
    }
  }, [stage.state.metadata])

  return (
    <Layout>
      <Grid>
        <form
          onSubmit={submitSearch(stage)} className="flex my-10"
        >
          <div className="mr-5 flex flex-1">
            <Input
              htmlInputProps={{
                placeholder: "Paste a link here from spotify, soundcloud, youtube, etc...",
                type: 'text',
                id: 'search',
                name: 'search',
                disabled: !!stage.state.musicCoverUrl
              }} 
            />
          </div>
          <Button
            title="Search song"
            htmlButtonProps={{
              type: 'submit',
              onClick: null
            }}
          ></Button>
        </form>

        {!stage.state.metadata && (
          <Card>
            <div className="min-h-[300px] flex justify-center items-center">
              <div className="text-xs text-center text-neutral-500">This is empty.</div>
            </div>
          </Card>
        )}

        {stage.state.metadata && (
          <>
            <h2 className="mb-2.5 text-neutral-500">Information</h2>
            <Card>
              <div className="mb-5">
                <h3 className="mb-1 text-neutral-500 text-xs font-light">Song name</h3>
                <Input
                  htmlInputProps={{
                    type: 'text',
                    id: 'name',
                    name: 'name',
                    value: stage.state.formMusicalCover.name,
                    onChange: setFormMusicalCover(stage),
                    disabled: !!stage.state.musicCoverUrl
                  }}
                />
              </div>

              <div className="mb-5">
                <h3 className="mb-1 text-neutral-500 text-xs font-light">Author</h3>
                <Input
                  htmlInputProps={{
                    type: 'text',
                    id: 'author',
                    name: 'author',
                    value: stage.state.formMusicalCover.author,
                    onChange: setFormMusicalCover(stage),
                    disabled: !!stage.state.musicCoverUrl
                  }}
                />
              </div>

              <div>
                <h3 className="mb-1 text-neutral-500 text-xs font-light">Quote</h3>
                <Input
                  htmlInputProps={{
                    type: 'text',
                    id: 'phrase',
                    name: 'phrase',
                    value: stage.state.formMusicalCover.phrase,
                    onChange: setFormMusicalCover(stage),
                    disabled: !!stage.state.musicCoverUrl
                  }}
                />
              </div>
            </Card>
          </>
        )}

        {stage.state.metadata && (
          <>
            <h2 className="mb-2.5 text-neutral-500">Preview</h2>
            <Card>
              <MusicCover
                name={stage.state.formMusicalCover.name}
                image={stage.state.metadata.image}
                author={stage.state.formMusicalCover.author}
                quote={stage.state.formMusicalCover.phrase}
              />
            </Card>
          </>
        )}

        <div className="flex flex-col items-center">
          {stage.state.metadata && !stage.state.musicCoverUrl && (
            <div className="w-full max-w-[200px]">
              <Button
                title="Generate"
                htmlButtonProps={{
                  onClick: generateMusicCover(stage)
                }}
              ></Button>
            </div>
          )}

          {stage.state.musicCoverUrl && (
            <div className="w-full max-w-[200px]">
              <Button
                title="Download"
                htmlButtonProps={{
                  onClick: downloadMusicCover(downloadRef)
                }}
              ></Button>
            </div>
          )}

          {stage.state.metadata && (
            <div className="my-2.5 w-full max-w-[200px]">
              <Button
                title="Clean"
                htmlButtonProps={{
                  onClick: () => stage.commitState(initialState)
                }}
              ></Button>
            </div>
          )}

          <a ref={downloadRef} className="hidden" href={stage.state.musicCoverUrl} download={stage.state.musicCoverFilename}></a>
        </div>

        {stage.state.loading && <GlobalLoader />}
      </Grid>
    </Layout>
  );
}

function downloadMusicCover(ref: MutableRefObject<HTMLAnchorElement>) {
  return async () => ref.current?.click()
}

function submitSearch(stage: Stage<State>) {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    stage.commitState({ ...stage.state, loading: true })

    const searchValue: HTMLInputElement = e.currentTarget.elements['search']

    if (searchValue) {
      const metadata = await fetchMetadata({ domain: searchValue.value })
      stage.commitState({ ...stage.state, metadata, loading: false })
    }
  }
}

function setFormMusicalCover(stage: Stage<State>) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name

    stage.commitState({
      ...stage.state, formMusicalCover: {
        ...stage.state.formMusicalCover,
        [key]: e.target.value
      }
    })
  }
}

function generateMusicCover(stage: Stage<State>) {
  return async () => {
    stage.commitState({ ...stage.state, loading: true })

    const musicCoverImage = await fetchMusicCoverImage({
      name: stage.state.formMusicalCover.name,
      image: stage.state.metadata.image,
      author: stage.state.formMusicalCover.author,
      quote: stage.state.formMusicalCover.phrase
    })

    const musicCoverUrl = URL.createObjectURL(await musicCoverImage.blob())
    stage.commitState({
      ...stage.state,
      musicCoverUrl,
      loading: false,
      musicCoverFilename: Date.now() + '_' + Math.trunc(Math.random() * 10000) + '.jpeg'
    })
  }
}

async function fetchMusicCoverImage(args: { name: string, author: string, image: string, quote: string }) {
  const { name, author, image, quote } = args

  const url = new URL(process.env.NEXT_PUBLIC_HOST + '/api/generate/music_cover')
  url.searchParams.append('name', name)
  url.searchParams.append('author', author)
  url.searchParams.append('image', encodeURIComponent(image))
  url.searchParams.append('quote', quote)

  return await fetch(url.href)
}

async function fetchMetadata(args: { domain: string }) {
  console.log(process.env.NEXT_PUBLIC_HOST)
  const url = new URL(process.env.NEXT_PUBLIC_HOST + '/api/metadata')
  url.searchParams.append('domain', encodeURIComponent(args.domain))

  const response = await fetch(url.href)
  return await response.json()
}

export default Index;
