import mailQueue from '../queues/mailQueue.js';

export const addEmailToMailQueue = async (emailData) => {
  try {
    await mailQueue.add(emailData);
  } catch (error) {
    console.log('error while add the email data in processor', error);
  }
};
