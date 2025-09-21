import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TypographyDemoComponent } from '../typography-demo/typography-demo.component';
import { ModalComponent } from '../modal/modal.component';
import { SuccessModalComponent } from '../modals/success-modal/success-modal.component';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { FormModalComponent } from '../modals/form-modal/form-modal.component';

@Component({
  selector: 'app-design-system',
  imports: [
    ButtonComponent, 
    TypographyDemoComponent, 
    ModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    ConfirmModalComponent,
    InfoModalComponent,
    FormModalComponent
  ],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.css'
})
export class DesignSystemComponent {
  // Modal states
  showBaseModal = false;
  showSuccessModal = false;
  showErrorModal = false;
  showConfirmModal = false;
  showInfoModal = false;
  showFormModal = false;

  // Modal methods
  openBaseModal() {
    this.showBaseModal = true;
  }

  closeBaseModal() {
    this.showBaseModal = false;
  }

  openSuccessModal() {
    this.showSuccessModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  openErrorModal() {
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  openInfoModal() {
    this.showInfoModal = true;
  }

  closeInfoModal() {
    this.showInfoModal = false;
  }

  openFormModal() {
    this.showFormModal = true;
  }

  closeFormModal() {
    this.showFormModal = false;
  }

  onConfirm() {
    console.log('Confirmed!');
    this.closeConfirmModal();
  }

  onCancel() {
    console.log('Cancelled!');
    this.closeConfirmModal();
  }

  onFormSubmit(data: any) {
    console.log('Form submitted:', data);
    this.closeFormModal();
  }
}
