import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import BookPreview from "$organisms/BookPreview";
import SortSelect from "$atoms/SortSelect";
import SearchTextField from "$atoms/SearchTextField";
import { Book } from "types/book";
import { gray } from "theme/colors";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  line: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(-2),
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: gray[50],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  books: {
    "&> :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

type Props = {
  books: Book[];
};

export default function BookImport(props: Props) {
  const { books } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  return (
    <Container classes={containerClasses} maxWidth="md">
      <div className={classes.header}>
        <Typography className={classes.title} variant="h4" gutterBottom={true}>
          ブックのインポート
          <Typography variant="body1">
            インポートしたいブックを選んでください
          </Typography>
        </Typography>
        <div className={classes.line}>
          <Button color="primary" size="large" variant="contained">
            ブックをインポート
          </Button>
          <SortSelect />
          <SearchTextField placeholder="ブック・トピック検索" />
        </div>
      </div>
      <div className={classes.books}>
        {books.map((book) => (
          <BookPreview key={book.id} book={book} />
        ))}
      </div>
    </Container>
  );
}