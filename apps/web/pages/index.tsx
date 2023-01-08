/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { MusicCover } from "../components/MusicCover";
import { ChangeEvent, FormEvent, useEffect } from "react";

import { useStage } from "../hooks/useStage";

import Image from 'next/image'

import { Metadata, Stage } from '@stative/interfaces'

interface State {
  metadata?: Metadata
  musicCoverImage?: string
  formMusicalCover: {
    author: string
    name: string
    phrase: string
  }
  
}

const initialState: State = {
  metadata: undefined,
  musicCoverImage: undefined,
  formMusicalCover: {
    author: 'Author',
    name: 'Song name',
    phrase: ''
  }
}

export function Index() {
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

  console.log(stage.state.musicCoverImage)

  return (
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
            <div className="text-xs text-center text-neutral-500">There are no songs loaded.</div>
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
                  onChange: setFormMusicalCover(stage)
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
                  onChange: setFormMusicalCover(stage)
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
                  onChange: setFormMusicalCover(stage)
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

      <div className="flex justify-between">
        <Button
          title="Generate"
          htmlButtonProps={{
            onClick: generateMusicCover(stage)
          }}
        ></Button>

        <div className="ml-2.5">
          <Button
            title="Reset"
            htmlButtonProps={{
              onClick: () => stage.commitState(initialState)
            }}
          ></Button>
        </div>
      </div>

      {stage.state.musicCoverImage && (
        <Image src={'data:image/jpeg;base64,' + stage.state.musicCoverImage} alt="im" />
      )}
    </Grid>
  );
}

function submitSearch(stage: Stage<State>) {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchValue: HTMLInputElement = e.currentTarget.elements['search']

    if (searchValue) {
      const metadata = await fetchMetadata({ domain: searchValue.value })
      stage.commitState({ ...stage.state, metadata })
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
    const musicCoverImage = await fetchMusicCoverImage({
      name: stage.state.formMusicalCover.name,
      image: stage.state.metadata.image,
      author: stage.state.formMusicalCover.author,
      quote: stage.state.formMusicalCover.phrase
    })
    // console.log(musicCoverImage.data)

    // fs.writeFile('hello.jpeg', Buffer.from(musicCoverImage.src.data), () => null)
    // stage.commitState({ ...stage.state, musicCoverImage: Buffer.from(musicCoverImage.src.data, 'base64') })
  }
}

async function fetchMusicCoverImage(args: { name: string, author: string, image: string, quote: string }) {
  const { name, author, image, quote } = args

  const url = new URL(process.env.NEXT_PUBLIC_HOST + '/api/generate/music_cover')
  url.searchParams.append('name', name)
  url.searchParams.append('author', author)
  url.searchParams.append('image', encodeURIComponent(image))
  url.searchParams.append('quote', quote)

  const response = await fetch(url.href)
  return await response.json()
}

async function fetchMetadata(args: { domain: string }) {
  const url = new URL(process.env.NEXT_PUBLIC_HOST + '/api/metadata')
  url.searchParams.append('domain', encodeURIComponent(args.domain))

  const response = await fetch(url.href)
  return await response.json()
}

export default Index;
