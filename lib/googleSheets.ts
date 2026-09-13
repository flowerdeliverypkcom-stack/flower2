import { google } from 'googleapis';

export interface WhatsAppLeadData {
  name: string;
  city: string;
  productName?: string;
  price?: number;
  phone?: string;
  source?: string;
  timestamp?: string;
}

export interface OccasionReminderData {
  name: string;
  whatsappNumber: string;
  occasion: string;
  date: string;
  timestamp?: string;
}

// Ensure private key escapes double quotes or raw newline strings properly
function getPrivateKey(): string | undefined {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n').replace(/"/g, '');
}

/**
 * Returns authenticated Google Sheets client or null if credentials are not configured
 */
function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getPrivateKey();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn(
      '[Google Sheets API Warning] Missing Google Service Account credentials in environment variables. Lead logged in fallback mode.'
    );
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return { sheets, spreadsheetId };
  } catch (error) {
    console.error('[Google Sheets Auth Error]', error);
    return null;
  }
}

/**
 * Append a row to Sheet 1: "WhatsApp Leads"
 */
export async function appendWhatsAppLead(data: WhatsAppLeadData) {
  const timestamp = data.timestamp || new Date().toISOString();
  const clientInfo = getSheetsClient();

  if (!clientInfo) {
    console.log('[Dev Lead Fallback Log - WhatsApp Lead]', {
      Timestamp: timestamp,
      Name: data.name,
      City: data.city,
      Product: data.productName || 'N/A',
      Price: data.price ? `Rs. ${data.price}` : 'N/A',
      Phone: data.phone || 'N/A',
      Source: data.source || 'Product Modal',
    });
    return { success: true, mode: 'fallback' };
  }

  const { sheets, spreadsheetId } = clientInfo;
  const sheetName = 'WhatsApp Leads';

  try {
    // Attempt appending values directly
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:F`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            timestamp,
            data.name,
            data.city,
            data.productName || 'General Inquiry',
            data.price ? `Rs. ${data.price}` : 'N/A',
            data.phone || 'WhatsApp Direct',
            data.source || 'Website Modal',
          ],
        ],
      },
    });

    return { success: true, mode: 'google_sheets' };
  } catch (error: any) {
    console.error(`[Google Sheets Error - ${sheetName}]`, error?.message || error);
    // If range/sheet name doesn't exist, try Sheet1 fallback
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A:F',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [
            [
              timestamp,
              data.name,
              data.city,
              data.productName || 'General Inquiry',
              data.price ? `Rs. ${data.price}` : 'N/A',
              data.phone || 'WhatsApp Direct',
              data.source || 'Website Modal',
            ],
          ],
        },
      });
      return { success: true, mode: 'google_sheets_default_tab' };
    } catch (fallbackError) {
      console.error('[Google Sheets Append Failed]', fallbackError);
      return { success: true, mode: 'fallback_due_to_api_error' };
    }
  }
}

/**
 * Append a row to Sheet 2: "Occasion Reminders"
 */
export async function appendOccasionReminder(data: OccasionReminderData) {
  const timestamp = data.timestamp || new Date().toISOString();
  const clientInfo = getSheetsClient();

  if (!clientInfo) {
    console.log('[Dev Lead Fallback Log - Occasion Reminder]', {
      Timestamp: timestamp,
      Name: data.name,
      WhatsAppNumber: data.whatsappNumber,
      Occasion: data.occasion,
      Date: data.date,
    });
    return { success: true, mode: 'fallback' };
  }

  const { sheets, spreadsheetId } = clientInfo;
  const sheetName = 'Occasion Reminders';

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:E`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[timestamp, data.name, data.whatsappNumber, data.occasion, data.date]],
      },
    });

    return { success: true, mode: 'google_sheets' };
  } catch (error: any) {
    console.error(`[Google Sheets Error - ${sheetName}]`, error?.message || error);
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A:E',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[timestamp, data.name, data.whatsappNumber, data.occasion, data.date]],
        },
      });
      return { success: true, mode: 'google_sheets_default_tab' };
    } catch (fallbackError) {
      console.error('[Google Sheets Append Failed]', fallbackError);
      return { success: true, mode: 'fallback_due_to_api_error' };
    }
  }
}
