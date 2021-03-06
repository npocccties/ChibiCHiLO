import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import BookForm from "$organisms/BookForm";
import RequiredDot from "$atoms/RequiredDot";
import BackButton from "$atoms/BackButton";
import useContainerStyles from "styles/container";
import type { BookSchema } from "$server/models/book";
import type { BookPropsWithSubmitOptions } from "$types/bookPropsWithSubmitOptions";
import { useSessionAtom } from "$store/session";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(4),
    "& span": {
      verticalAlign: "middle",
    },
    "& .RequiredDot": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
      marginLeft: theme.spacing(2),
    },
  },
  alert: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  book?: BookSchema;
  onSubmit: (book: BookPropsWithSubmitOptions) => void;
  onCancel(): void;
};

export default function BookNew(props: Props) {
  const { book, onSubmit, onCancel } = props;
  const { isBookEditable } = useSessionAtom();
  const forkFrom = book && !isBookEditable(book) && book.author;
  const defaultBook = book && {
    ...book,
    ...(forkFrom && { name: [book.name, "フォーク"].join("_") }),
  };
  const classes = useStyles();
  const containerClasses = useContainerStyles();

  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <BackButton onClick={onCancel}>戻る</BackButton>
      <Typography className={classes.title} variant="h4">
        ブックの作成
        <Typography variant="caption" component="span" aria-hidden="true">
          <RequiredDot />
          は必須項目です
        </Typography>
      </Typography>
      {forkFrom && (
        <Alert className={classes.alert} severity="info">
          {forkFrom.name} さんが作成したブックをフォークしようとしています
        </Alert>
      )}
      <BookForm book={defaultBook} variant="create" onSubmit={onSubmit} />
    </Container>
  );
}
