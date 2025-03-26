import * as XLSX from 'xlsx';
import {XlsxFileParams} from "../types";

type Args = {
  file?: File;
  onSuccess?: (file: File) => void;
  onError?: (message: string) => void;
} & XlsxFileParams;


export class XlsxValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'XlsxValidationError';
  }
}

const isValidXlsxFormat = (buffer: Uint8Array) => {
  const xlsxSignature = [0x50, 0x4B, 0x03, 0x04];
  return xlsxSignature.every((byte, index) => buffer[index] === byte);
};

const getMissingColumns = (jsonData: string[], requiredColumns: string[]) => {
  const headers = jsonData.map(header =>
    header.toString().trim().toLowerCase()
  );

  return requiredColumns
    .filter(column => !headers.includes(column.toLowerCase()))
    .join(', ');
};

export const validateXlsx = async ({
  file,
  requiredColumns = [],
  maxSize = 5,
  headersRow = 1,
}: Args) => {
    if (!file) {
      throw new XlsxValidationError('No file provided');
    }

    const maxSizeBytes = maxSize * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      throw new XlsxValidationError(`File size exceeds the limit of ${maxSize}MB`);
    }

    const fileData = await file.arrayBuffer();
    const buffer = new Uint8Array(fileData);

    if (!isValidXlsxFormat(buffer)) {
      throw new XlsxValidationError('Invalid file format. The file is not a valid Excel document');
    }

    const workbook = XLSX.read(fileData, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[headersRow - 1] as string[];
    const missingColumns = getMissingColumns(headers, requiredColumns);

    if (missingColumns) {
      throw new XlsxValidationError(`Missing required columns: ${missingColumns}`);
    }

    return
};