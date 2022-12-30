/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { FormEvent, useEffect } from "react";

import { useStage } from "../hooks/useStage";

import { Metadata, Stage } from '@stative/interfaces'

import classNames from "classnames";

interface State {
  metadata?: Metadata
  backgroundColor?: string
}

const initialState: State = {}

export function Index() {
  const stage = useStage<State>(initialState)

  useEffect(() => {
    if (stage.state.metadata) {
      // setAverageColor(stage)
      const r = getRandom(0, 255)
      const g = getRandom(0, 255)
      const b = getRandom(0, 255)

      console.log(r, g, b)

      stage.commitState({ backgroundColor: `rgb(${r},${g},${b})` })

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
            {/* <div className="min-h-[300px] flex justify-center items-center">
              <div className="text-xs text-center text-neutral-500">Inputs.</div>
            </div> */}
            <div className="mb-5">
              <h3 className="mb-1 text-neutral-500 text-xs font-light">Song name</h3>
              <Input
                htmlInputProps={{
                  type: 'text',
                  id: 'title',
                  name: 'title'
                }}
              />
            </div>

            <div className="mb-5">
              <h3 className="mb-1 text-neutral-500 text-xs font-light">Author</h3>
              <Input
                htmlInputProps={{
                  type: 'text',
                  id: 'title',
                  name: 'title'
                }}
              />
            </div>

            <div>
              <h3 className="mb-1 text-neutral-500 text-xs font-light">Quote</h3>
              <Input
                htmlInputProps={{
                  type: 'text',
                  id: 'title',
                  name: 'title'
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
                  <div className="w-[150px] h-[150px]">
                    <img
                      className="object-cover object-center h-[inherit]"
                      alt="Song cover"
                      src={stage.state.metadata.image}
                    />
                  </div>

                  <div className="ml-5">
                    <div className="uppercase text-xl font-medium">53 Thieves</div>
                    <div className="text-sm uppercase">what you do to me</div>
                  </div>
                </div>

                <div className="flex flex-1 items-center text-2xl font-light">
                  <span className="text-center">
                    <span>&quot;</span>
                    <span>Something takes a part of me, every time you leave.</span>
                    <span>&quot;</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-center my-2.5">STATIVE.</div>
            </div>
          </Card>
        </>
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
      stage.commitState({ metadata })
    }
  }
}

async function fetchMetadata(args: { domain: string }) {
  const response = await fetch('/api/metadata?domain=' + args.domain)
  return await response.json()
}

// async function setAverageColor(stage: Stage<State>) {
//   if (stage.state.metadata) {
//     const color = await prominent(stage.state.metadata.image, { amount: 1 })
//     console.log(color)
//   }
// }

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default Index;
