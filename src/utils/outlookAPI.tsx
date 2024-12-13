export const getItemId = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const itemId = Office.context.mailbox.item.itemId;
        if (!itemId) {
          reject('No item ID found'); // Reject if the itemId is not found
        }
        resolve(itemId);
      } catch (error) {
        reject('Error retrieving item ID: ' + error.message);
      }
    });
  };
  
  export const getConversationId = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const conversationId = Office.context.mailbox.item.conversationId;
        if (!conversationId) {
          reject('No conversation ID found'); // Reject if the conversationId is not found
        }
        resolve(conversationId);
      } catch (error) {
        reject('Error retrieving conversation ID: ' + error.message);
      }
    });
  };
  

  export const getEmailSubject = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const subject = Office.context.mailbox.item.subject;
        if (!subject) {
          reject('No subject found');
        }
        resolve(subject);
      } catch (error) {
        reject('Error retrieving subject: ' + error.message);
      }
    });
  };
  