import {Grid} from "../components/Grid";
import {Button} from "../components/Button";
import {Input} from "../components/Input";

export function Index() {
  return (
    <Grid>
      <div>Hello world!</div>
      <div className="flex">
        <div className="mr-5 flex flex-1">
          <Input htmlInputProps={{ placeholder: "Paste a link here from youtube, spotify, etc..." }} />
        </div>
        <Button title="Search song"></Button>
      </div>
    </Grid>
  );
}

export default Index;
