function onFormSubmit(e) {
  // Access form data
  const formData = e.namedValues;

  // Create PDF
  const pdfFile = createPDF(formData);

  // Send email
  sendEmail(formData['Email Address']['0'], pdfFile); //UPDATEME: If the field you want to email the PDF to is not named "Email Address" in your sheet
}

function createPDF(formData) {
  // Retrieve a template document
  const templateId = "this is a the long string of letters in the url of your google doc"; //UPDATEME: Replace with your template Doc ID
  const templateDoc = DriveApp.getFileById(templateId).makeCopy();
  const templateCopy = templateDoc.getId();

  // Replace placeholders with form data
  const templateCopyDoc = DocumentApp.openById(templateCopy)
  const body = templateCopyDoc.getBody();
  for (const [key, value] of Object.entries(formData)) {
    body.replaceText(`{{${key}}}`, value);
  }

  // Save and export as PDF
  templateCopyDoc.saveAndClose();
  const pdfBlob = templateCopyDoc.getAs(MimeType.PDF);
  DriveApp.getFileById(templateCopy).setTrashed(true); 
  return pdfBlob;
}

function sendEmail(recipientEmail, pdfFile) {
  // Customize email content
  const subject = "My Special Report"; //UPDATEME: Put in a meaningful email subject for your form
  const body = "Please find the attached PDF created from your form submission.";

  // Send the email with PDF attachment
  GmailApp.sendEmail(recipientEmail, subject, body, {
    attachments: [pdfFile],
  });
}
