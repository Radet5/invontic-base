export interface FieldInterface {
  value: string | number;
  name: string;
  type: string;
  id: string;
  label: string;
  width?: number;
  onChange?: (
    key: string,
    value: string
  ) => void | ((key: string, value: number) => void);
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  active?: boolean;
  fieldRef?: any;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  options?: any;
}
