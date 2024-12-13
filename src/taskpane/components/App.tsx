import React, { useEffect, useState } from 'react';
import { getConversationId, getEmailSubject, getItemId } from '../../utils/outlookAPI';
import TaskPane from '../taskpane';

const App: React.FC = () => {
  const [conversationId, setConversationId] = useState<string | null>(null); // Store the conversationId
  const [emailId, setEmailId] = useState<string | null>(null); // Store the emailId
  const [subject, setSubject] = useState<string | null>(null); // Store the subject
  const [error, setError] = useState<string | null>(null); // Store any error message

  // Fetch the conversationId, emailId, and subject when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const convId = await getConversationId();
        const mailId = await getItemId();
        const emailSubject = await getEmailSubject();

        if (convId && mailId && emailSubject) {
          setConversationId(convId);
          setEmailId(mailId);
          setSubject(emailSubject);
        } else {
          setError('Failed to fetch email details.');
        }
      } catch (err) {
        setError('Error fetching email details.');
      }
    };

    fetchDetails();
  }, []);  // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div>
      {/* Error Message */}
      {error && <div style={{ color: 'red', margin: '20px' }}>{error}</div>}

      {/* TaskPane */}
      {conversationId && emailId && subject && (
        <TaskPane
          conversationId={conversationId}
          emailId={emailId}
          subject={subject}
        />
      )}

      {/* Fallback message if required data is missing */}
      {(!conversationId || !emailId || !subject) && !error && (
        <div style={{ margin: '20px' }}>
          <p>Loading email details...</p>
        </div>
      )}
    </div>
  );
};

export default App;
