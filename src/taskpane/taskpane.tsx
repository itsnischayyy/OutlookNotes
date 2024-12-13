import * as React from 'react';
import { makeStyles, Text, Button, Dialog, DialogContent } from '@fluentui/react-components';
import NotesManager from './components/NotesManager';

interface TaskPaneProps {
  conversationId: string;
  emailId: string;
  subject: string;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  button: {
    marginTop: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  noteSection: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
});

const TaskPane: React.FC<TaskPaneProps> = ({ conversationId, emailId, subject }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [notesVisible, setNotesVisible] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const styles = useStyles();

  // Toggle the dialog visibility
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  // Toggle the notes section visibility
  const toggleNotes = () => {
    setNotesVisible(!notesVisible);
  };

  return (
    <div className={styles.container}>
      {/* Header for the Task Pane */}
      <Text className={styles.header}>Task Pane for Email Notes</Text>

      {/* Error Message */}
      {error && <Text className={styles.errorMessage}>{error}</Text>}

      {/* Display email subject */}
      <Text className={styles.header}>Subject: {subject}</Text>

      {/* Section to toggle Notes */}
      <div className={styles.noteSection}>
        <Button onClick={toggleNotes} appearance="primary">
          {notesVisible ? 'Hide Notes' : 'Show Notes'}
        </Button>

        {/* Display Notes Manager component when toggled */}
        {notesVisible && emailId && (
          <NotesManager emailId={emailId} conversationId={conversationId} subject={subject} />
        )}
      </div>

      {/* Button to open a dialog */}
      <Button className={styles.button} onClick={toggleDialog} appearance="primary">
        Open Dialog
      </Button>

      {/* Dialog to show additional actions */}
      <Dialog
        open={showDialog}
        onOpenChange={(_, data) => setShowDialog(data.open)}
        modalType="modal"
      >
        <DialogContent title="Additional Action" />

        {/* Custom Dialog Footer */}
        <div className={styles.dialogFooter}>
          <Button onClick={toggleDialog} appearance="secondary">
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default TaskPane;
