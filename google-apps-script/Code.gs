const ALLOWED_GUESTS = {
  isabella: "Isabella",
  matteo: "Matteo",
  darrell: "Darrell",
  melana: "Melana",
  kaiden: "Kaiden",
};

const SHEET_NAME = "RSVPs";
const HEADERS = [
  "Updated",
  "Guest",
  "RSVP",
  "Arrival",
  "Payment",
  "Bringing dessert",
  "Dessert",
  "Notes",
];

function doGet() {
  return ContentService.createTextOutput("RSVP receiver is running.");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const guestKey = String(data.guest || "").toLowerCase();
    const rsvp = String(data.rsvp || "").toLowerCase();

    if (!ALLOWED_GUESTS[guestKey] || !["yes", "no"].includes(rsvp)) {
      return jsonResponse({ ok: false, error: "Invalid RSVP" });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const row = [
      new Date(),
      ALLOWED_GUESTS[guestKey],
      rsvp === "yes" ? "Yes" : "No",
      rsvp === "yes" ? clean(data.arrival, 40) : "",
      rsvp === "yes" ? clean(data.paymentMethod, 40) : "",
      rsvp === "yes" && data.bringingDessert === true ? "Yes" : "No",
      rsvp === "yes" ? clean(data.dessert, 200) : "",
      clean(data.notes, 1000),
    ];

    const existingRow = findGuestRow(sheet, ALLOWED_GUESTS[guestKey]);
    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    sheet.autoResizeColumns(1, HEADERS.length);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function findGuestRow(sheet, guestName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const names = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  const index = names.findIndex((name) => String(name) === guestName);
  return index === -1 ? null : index + 2;
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
