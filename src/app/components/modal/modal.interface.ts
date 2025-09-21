// Modal configuration interfaces for MotivKids app

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalPosition = 'center' | 'top' | 'bottom';
export type ModalAnimation = 'fade' | 'slide-down' | 'slide-up' | 'zoom';

export interface ModalConfig {
  size?: ModalSize;
  position?: ModalPosition;
  animation?: ModalAnimation;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKey?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
  customClass?: string;
}

export interface ModalAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalHeader {
  title: string;
  subtitle?: string;
  icon?: string;
  showCloseButton?: boolean;
}

export interface ModalData {
  header?: ModalHeader;
  body?: any;
  actions?: ModalAction[];
  config?: ModalConfig;
}

export interface ModalRef {
  id: string;
  componentRef?: any;
  close: (result?: any) => void;
  updateConfig: (config: Partial<ModalConfig>) => void;
  onClose: () => Promise<any>;
}

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  size: 'medium',
  position: 'center',
  animation: 'fade',
  closeOnBackdropClick: true,
  closeOnEscapeKey: true,
  showCloseButton: true,
  preventBodyScroll: true,
  customClass: ''
};