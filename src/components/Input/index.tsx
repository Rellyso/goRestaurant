import {
  useEffect,
  useRef,
  useState,
  useCallback,
  HTMLProps,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconType } from 'react-icons';

interface InputProps {
  name: string;
  Icon?: IconType; // qual é a tipagem para ícones?
  placeholder: string;
}

export function Input({ name, Icon, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, defaultValue, registerField } = useField(name);


  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};