export interface Login {
  token: string;
}

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  message: string;
}
