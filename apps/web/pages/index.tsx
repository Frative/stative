import {Grid} from "../components/Grid";
import {Button} from "../components/Button";

export function Index() {
  return (
    <Grid>
      <div className="text-neutral-700">Hello world!</div>
      <Button title="Search song"></Button>
    </Grid>
  );
}

export default Index;
