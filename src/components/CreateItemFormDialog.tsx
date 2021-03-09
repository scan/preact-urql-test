import { h, FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { useMutation, gql } from "@urql/preact";
import { useForm } from "react-hook-form";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import type {
  CreateItemMutation,
  CreateItemMutationVariables,
} from "../graphql";

interface FormData {
  title: string;
  content?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($title: String!, $content: String) {
    addItem(item: { title: $title, content: $content }) {
      id
    }
  }
`;

const CreateItemFormDialog: FunctionalComponent<Props> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { register, handleSubmit: formSubmit, errors } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [_createItemResult, createItem] = useMutation<
    CreateItemMutation,
    CreateItemMutationVariables
  >(CREATE_ITEM_MUTATION);

  const startCreate = useCallback(
    async (formData: FormData) => {
      setSubmitting(true);

      const { data, error: apiError } = await createItem({
        ...formData,
      });

      if (apiError) {
        console.error(apiError);
      }

      setSubmitting(false);

      if (data) {
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      }
    },
    [onClose, setSubmitting, onSuccess, createItem]
  );

  const handleSubmit = useCallback(() => {
    formSubmit(startCreate);
  }, [formSubmit, startCreate]);

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <form noValidate onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new item with title and content.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            inputRef={register({ required: true })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            multiline
            rowsMax={4}
            fullWidth
            inputRef={register}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={onClose}
            color="secondary"
            tabIndex={-1}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={submitting}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CreateItemFormDialog.displayName = "CreateItemFormDialog";

export default CreateItemFormDialog;
