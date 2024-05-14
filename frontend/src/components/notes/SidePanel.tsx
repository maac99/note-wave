import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Button,
  SelectTabData,
  Tab,
  Text,
  TabList,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import {
  Archive16Regular,
  Delete16Regular,
  ArchiveArrowBack16Regular,
  AddSquare24Regular,
} from "@fluentui/react-icons";
import React from "react";
import { useNotes } from "../utils/useNotes";
import "./SidePanel.css";
import {
  createNote,
  deleteNote,
  saveNote,
  toggleArchiveNote,
} from "../utils/notesUtilities";
import { initialTitle, initialValue } from "./initialValue";
import { PartialListNote } from "../utils/notes";

interface SidePanelProps {
  selectedNote: string | null;
  onAddOrDeleteNote: (noteId: string | null) => void;
  onNoteSelect: (_: unknown, data: SelectTabData) => void;
  onArchiveNote: () => void;
  activeNotes: PartialListNote[] | undefined;
  archivedNotes: PartialListNote[] | undefined;
}

const useStyles = makeStyles({
  noteTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: "142px",
  },
});

export const SidePanel = ({
  selectedNote,
  onAddOrDeleteNote,
  onArchiveNote,
  onNoteSelect,
  activeNotes,
  archivedNotes,
}: SidePanelProps) => {
  const [openItems, setOpenItems] = React.useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (
    _: unknown,
    data
  ) => {
    setOpenItems(data.openItems);
  };
  const styles = useStyles();

  return (
    <div className="notes-sidepanel">
      <div className="notes-header-title">
        <div>Notes</div>
        <div>
          <Button
            onClick={() => {
              createNote(initialTitle, initialValue())
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  onAddOrDeleteNote(data.id);
                });
            }}
            appearance="transparent"
            icon={<AddSquare24Regular />}
          />
        </div>
      </div>
      <Accordion
        multiple
        collapsible
        openItems={openItems}
        onToggle={handleToggle}
      >
        <AccordionItem value="1">
          <AccordionHeader>Active</AccordionHeader>
          <AccordionPanel>
            <TabList
              selectedValue={selectedNote}
              onTabSelect={onNoteSelect}
              vertical
            >
              {activeNotes &&
                activeNotes.map((note) => (
                  <Tab value={note.id} key={note.id}>
                    <div className="actionButtons">
                      <Text className={styles.noteTitle}>{note.title}</Text>
                      <Button
                        appearance="transparent"
                        icon={<Archive16Regular />}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleArchiveNote(note.id).then(() => {
                            onArchiveNote();
                          });
                        }}
                      />
                      <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            appearance="transparent"
                            icon={<Delete16Regular />}
                          />
                        </DialogTrigger>
                        <DialogSurface>
                          <DialogBody>
                            <DialogTitle>Delete note</DialogTitle>
                            <DialogContent>
                              Are you sure you want to delete the note?
                            </DialogContent>
                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">No</Button>
                              </DialogTrigger>
                              <Button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  deleteNote(note.id).then(() => {
                                    onAddOrDeleteNote(null);
                                  });
                                }}
                                appearance="primary"
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    </div>
                  </Tab>
                ))}
            </TabList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Archived</AccordionHeader>
          <AccordionPanel>
            <TabList
              selectedValue={selectedNote}
              onTabSelect={onNoteSelect}
              vertical
            >
              {archivedNotes &&
                archivedNotes.map((note) => (
                  <Tab value={note.id} key={note.id}>
                    <div className="actionButtons">
                      <Text className={styles.noteTitle}>{note.title}</Text>
                      <Button
                        appearance="transparent"
                        icon={<ArchiveArrowBack16Regular />}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleArchiveNote(note.id).then(() => {
                            onArchiveNote();
                          });
                        }}
                      />
                      <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                          <Button
                            appearance="transparent"
                            icon={<Delete16Regular />}
                          />
                        </DialogTrigger>
                        <DialogSurface>
                          <DialogBody>
                            <DialogTitle>Delete note</DialogTitle>
                            <DialogContent>
                              Are you sure you want to delete the note?
                            </DialogContent>
                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">No</Button>
                              </DialogTrigger>
                              <Button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  deleteNote(note.id).then(() => {
                                    onAddOrDeleteNote(null);
                                  });
                                }}
                                appearance="primary"
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    </div>
                  </Tab>
                ))}
            </TabList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
