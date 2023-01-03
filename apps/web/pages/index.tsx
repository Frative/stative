/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { ChangeEvent, FormEvent, useEffect } from "react";

import { useStage } from "../hooks/useStage";

import { Metadata, Stage } from '@stative/interfaces'

interface State {
  metadata?: Metadata
  formMusicalCover: {
    author: string
    name: string
    phrase: string
  }
  
}

const initialState: State = {
  metadata: undefined,
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
            <div
              className="w-[540px] h-[540px] p-10 m-auto"
            >
              <div className="shadow-neutral-500 w-full h-full rounded-lg shadow-sm py-10 px-5 flex flex-col">
                <div className="flex w-full">
                  <div className="w-[150px] h-[150px] min-w-[150px]">
                    <img
                      className="object-cover object-center h-[inherit] rounded-md"
                      alt="Song cover"
                      src={stage.state.metadata.image}
                    />
                  </div>

                  <div className="ml-5">
                    <div className="uppercase text-xl font-medium">{ stage.state.formMusicalCover.author }</div>
                    <div className="text-sm uppercase">{ stage.state.formMusicalCover.name }</div>
                  </div>
                </div>

                <div className="flex flex-1 items-center text-2xl font-light">
                  {stage.state.formMusicalCover.phrase && (
                    <div className="text-center flex-1">
                      <span>&quot;</span>
                      <span>{ stage.state.formMusicalCover.phrase }</span>
                      <span>&quot;</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-center my-2.5 tracking-widest">STATIVE</div>
            </div>
          </Card>
        </>
      )}

      <div className="flex justify-between">
        <Button
          title="Generate"
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

async function fetchMetadata(args: { domain: string }) {
  const response = await fetch('/api/metadata?domain=' + args.domain)
  return await response.json()
}

export default Index;
