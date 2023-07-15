import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ className, ...props }: Props): JSX.Element => (
  <input className={`w-full border border-gray-300 rounded-md py-1 px-2 mr-2 ${className}`} {...props} />
);

export default Input;
