/* eslint-disable @next/next/no-img-element */
import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import { Card } from "../components/Card";
import { FormEvent } from "react";

export function Index() {
  return (
    <Grid>
      <form
        onSubmit={submitSearch()} className="flex my-10"
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

      <Card>
        <div className="min-h-[300px] flex justify-center items-center">
          <div className="text-xs text-center text-neutral-500">There are no songs loaded.</div>
        </div>
      </Card>

      <h2 className="mb-2.5 text-neutral-500">Information</h2>
      <Card>
        <div className="flex">
          <div>
            <img
              width={300}
              height={300}
              alt="Song cover"
              src="https://lh3.googleusercontent.com/ThA2l-LJ61FO1uVSs8g9WOh-mWdtDmnOHH0USdJS-Uv8kkHgWk7X1QCGYUzmVfCZZHDujUcTJknLaA8=w544-h544-l90-rj"
            />
          </div>

          <div>

          </div>
        </div>
      </Card>
    </Grid>
  );
}

function submitSearch() {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchValue: HTMLInputElement = e.currentTarget.elements['search']

    if (searchValue) {
      const metadata = await fetchMetadata({ domain: searchValue.value })
      console.log(metadata)
    }

  }
}

async function fetchMetadata(args: { domain: string }) {
  const response = await fetch('/api/metadata?domain=' + args.domain)
  return await response.json()
}

export default Index;
