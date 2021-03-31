import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FormHandles } from '@unform/core';

interface Food {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleUpdateFood: (data: Food) => void;
  editingFood: Food;
}

export function ModalEditFood({ setIsOpen, isOpen, handleUpdateFood, editingFood }: ModalEditFoodProps) {
  const formRef = createRef<FormHandles>();

  formRef.current?.setData({ name: "algum nome" })

  async function handleSubmit(data: Food) {
    handleUpdateFood(data);
    setIsOpen(!isOpen);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
