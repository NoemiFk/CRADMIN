export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'object'|'boolean'|'date' |'number' | 'datehard';
  visible?: boolean;
  object?: String;
  cssClasses?: string[];
}
