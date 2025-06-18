interface BaseComponentProps {
  className?: string;
}

export interface ButtonProps extends BaseComponentProps {
  text: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size: 'default' | 'sm' | 'lg';
}

export interface InputProps extends BaseComponentProps {
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'number';
  label: string;
}

export interface CardProps extends BaseComponentProps {
  title: string;
  description?: string;
  content?: string;
  children?: ComponentType[];
}

export interface ComponentType {
  id: string;
  type: 'button' | 'input' | 'card';
  properties: ButtonProps | InputProps | CardProps;
}

export type ComponentProps = ButtonProps | InputProps | CardProps;

export type StylePreset = {
  button: {
    variant: ButtonProps['variant'];
    className: string;
  };
  card: {
    className: string;
  };
  input: {
    className: string;
  };
};
