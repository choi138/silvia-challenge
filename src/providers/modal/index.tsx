import React, { createContext, useContext, useState } from 'react';

import { Modal, ModalProps } from 'src/components/common';

export interface ModalProviderContext {
  open: (props: ModalProps) => void;
  close: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}

/**
 * 모달을 사용할 수 있도록 하는 컨텍스트
 */
export const ModalContext = createContext<ModalProviderContext | null>(null);

/**
 * 전체 모달을 관리하는 프로바이더
 * @param children 자식 컴포넌트
 */
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

/**
 * 모달을 사용하기 위한 훅
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal() must be used within a ModalProvider');

  return context;
};
