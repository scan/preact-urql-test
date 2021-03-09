import { FunctionalComponent, h } from "preact";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ItemList from "../../components/ItemList";

const Home: FunctionalComponent = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography component="h1" variant="h3">
          List of Todos
        </Typography>
      </Grid>
      <Grid>
        <ItemList />
      </Grid>
    </Grid>
  );
};

export default Home;
