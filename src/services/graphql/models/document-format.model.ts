export type DocumentFormatGroupModel = {
  id: string;
  code: string;
  name_th: string;
  formats: DocumentFormatModel[];
};

export type DocumentFormatModel = {
  id: string;
  running_key: string;
  run_format: string;
};
