import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent {
  constructor(public notify: NotificationService) {}

  message = computed(() => this.notify.notification()?.message ?? '');
  type = computed(() => this.notify.notification()?.type ?? null);

  close() {
    this.notify.clear();
  }
}
