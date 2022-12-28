/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { FormEvent, useEffect } from "react";

import { useStage } from "../hooks/useStage";

import { Metadata, Stage } from '@stative/interfaces'

interface State {
  metadata?: Metadata
}

const initialState: State = {}

export function Index() {
  const stage = useStage<State>(initialState)

  useEffect(() => {
    console.log(stage.state.metadata)
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
            <div className="min-h-[300px] flex justify-center items-center">
              <div className="text-xs text-center text-neutral-500">Inputs.</div>
            </div>
          </Card>
        </>
      )}

      {stage.state.metadata && (
        <>
          <h2 className="mb-2.5 text-neutral-500">Preview</h2>
          <Card>
            <div className="flex">
              <div className="w-[300px] h-[300px]">
                <img
                  className="object-cover object-center h-[inherit]"
                  alt="Song cover"
                  src={stage.state.metadata.image}
                />
              </div>

              <div>

              </div>
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

export default Index;
