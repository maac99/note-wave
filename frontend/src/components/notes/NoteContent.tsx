import YooptaEditor, { YooptaPlugin, createYooptaEditor } from "@yoopta/editor";
import React from "react";
import Paragraph from "@yoopta/paragraph";
import {
  Button,
  Field,
  Textarea,
  Toast,
  ToastTitle,
  useId,
  useToastController,
  ToastIntent,
} from "@fluentui/react-components";
import { saveNote } from "../utils/notesUtilities";
import { useNote } from "../utils/useNote";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import * as Marks from "@yoopta/marks";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { Descendant } from "slate";

interface NoteContentProps {
  selectedNote: string | null;
  onSaveNote: () => void;
}

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  NumberedList,
  BulletedList,
  TodoList,
] as unknown as YooptaPlugin<string, Descendant, Record<string, unknown>>[];
const tools = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
};
const marks = [Marks.Bold, Marks.Highlight, Marks.CodeMark, Marks.Italic];

export const NoteContent = ({ selectedNote, onSaveNote }: NoteContentProps) => {
  const note = useNote(selectedNote);
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const editor = React.useMemo(() => createYooptaEditor(), []);
  const onSaveHandler = async () => {
    const title = getTitle();
    const error: ToastIntent = "error";
    if (!title) {
      dispatchToast(
        <Toast>
          <ToastTitle>Toast intent: {error}</ToastTitle>
        </Toast>,
        {
          intent: error,
        }
      );
    }

    saveNote(
      note!.id,
      getTitle(),
      JSON.stringify(editor.getEditorValue())
    ).then(() => {
      onSaveNote();
    });
  };

  const getTitle = () => {
    const blocks = editor.getEditorValue();
    for (const blockKey in blocks) {
      const block = blocks[blockKey];
      if (block.meta.order == 0) {
        return block.value[0].children[0].text;
      }
    }
  };

  React.useEffect(() => {
    if (!editor || !note) return;
    editor.setEditorValue(note.content);
  }, [note, editor]);

  return (
    <>
      {note && (
        <div>
          <div className="editor">
            <YooptaEditor
              editor={editor}
              plugins={plugins}
              tools={tools}
              marks={marks}
            />
          </div>
          <Button appearance="primary" onClick={onSaveHandler}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};
