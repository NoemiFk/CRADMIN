export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'object' | 'number' | 'boolean';
  visible?: boolean;
  object?: String;
  cssClasses?: string[];
}
