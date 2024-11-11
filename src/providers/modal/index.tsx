import React, { useContext, useState } from 'react';

import { Modal, ModalProps } from 'src/components/common';

export interface ModalProviderContext {
  open: (props: ModalProps) => void;
  close: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = React.createContext<ModalProviderContext | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps | null>(null);

  const open = (props: ModalProps) => {
    setModal(props);
  };

  const close = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
      }}
    >
      {modal && <Modal.Overlay>{modal && <Modal {...modal} />}</Modal.Overlay>}

      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal() must be used within a ModalProvider');

  return context;
};
