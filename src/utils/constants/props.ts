export interface TableProps {}

export interface ModelProps {
  id: string;
}

export interface DialogueProps {
  id: string;
  title: string;
  description?: string;
}

export interface TextProps {
  id: string;
  title: string;
  type: 'dictation' | 'translation';
  isPublic?: boolean;
  description?: string;
  originalText: string;
  originalLanguage: string;
  translatedText: string;
  translatedLanguage: string;
  ownerId: string;
  imageUrl?: string;
  // users: string[];
}

export interface TranslatorProps {
  from: string;
  to: string;
  text: string;
}
