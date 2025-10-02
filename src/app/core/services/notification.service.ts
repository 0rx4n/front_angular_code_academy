import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notification = signal<Notification | null>(null);
  notification = this._notification.asReadonly();

  show(message: string, type: NotificationType = 'info') {
    this._notification.set({ message, type });
    // avtomatik 3 saniyədən sonra gizlə
    setTimeout(() => this.clear(), 3000);
  }

  showInfo(message: string) {
  this.show(message, 'info');
}


  showError(message: string) {
    this.show(message, 'error');
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  clear() {
    this._notification.set(null);
  }
}
