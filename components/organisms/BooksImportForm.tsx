import { Buffer } from "buffer";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import { BooksImportParams } from "$server/validators/booksImportParams";
import { NEXT_PUBLIC_API_BASE_PATH } from "$utils/env";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
}));

type Props = {
  className?: string;
  onSubmit?: (book: BooksImportParams) => void;
};

export default function BooksImportForm(props: Props) {
  const { className, onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();

  const wowzaUrl = "https://www.wowza.com/";
  const providers: { [key: string]: string } = { wowza: wowzaUrl };
  const defaultValues: BooksImportParams = {
    json: "",
    file: "",
    provider: wowzaUrl,
    wowzaBaseUrl: `${NEXT_PUBLIC_API_BASE_PATH}/api/v2/wowza`,
  };
  const { handleSubmit, register, control } = useForm<BooksImportParams>({
    defaultValues,
  });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      component="form"
      onSubmit={handleSubmit((values: BooksImportParams) => {
        if (values?.file?.length) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              onSubmit({
                ...defaultValues,
                ...values,
                file: Buffer.from(reader.result as ArrayBuffer).toString(
                  "base64"
                ),
              });
            },
            false
          );
          // eslint-disable-next-line tsc/config
          reader.readAsArrayBuffer(values.file[0] as File);
        } else {
          onSubmit({ ...defaultValues, ...values, file: undefined });
        }
      })}
    >
      <TextField label="file" name="file" type="file" inputRef={register} />
      <Controller
        name="provider"
        control={control}
        defaultValue={defaultValues.provider}
        render={(props) => (
          <TextField
            label="動画ファイルをアップロードするサービス"
            select
            inputProps={props}
          >
            {Object.entries(providers).map(([label, value]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Button variant="contained" color="primary" type="submit">
        インポート
      </Button>
    </Card>
  );
}
