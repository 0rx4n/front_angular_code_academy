import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';

type AddCarForm = {
  marka: string;
  model: string;
  city: string;
  ban: string;
  year: string;
  price: number | null;
  image: string;
};

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.html',
  styleUrls: ['./add-car.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCar {
  // Lokal option-lar
  brandOptions: string[] = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda', 'Ford', 'Nissan', 'Volkswagen', 'Kia', 'Hyundai'];
  modelsByBrand: Record<string, string[]> = {
    BMW: ['X5', 'M3', '320i'],
    Audi: ['A4', 'Q7', 'A6'],
    Mercedes: ['C200', 'GLE', 'E200'],
    Toyota: ['Corolla', 'RAV4', 'Camry'],
    Honda: ['Civic', 'Accord', 'CR-V'],
    Ford: ['Focus', 'Mustang', 'Kuga'],
    Nissan: ['Qashqai', 'Altima', 'X-Trail'],
    Volkswagen: ['Passat', 'Golf', 'Tiguan'],
    Kia: ['Sportage', 'Sorento', 'Rio'],
    Hyundai: ['Elantra', 'Tucson', 'Sonata']
  };
  modelOptions: string[] = [];

  cityOptions: string[] = ['Bakı', 'Gəncə', 'Sumqayıt', 'Şəki', 'Mingəçevir'];
  banOptions: string[] = ['Sedan', 'Offroader', 'Hatchback', 'Coupe', 'Universal'];
  yearOptions: string[] = [];

  error = '';
  success = '';

  form: AddCarForm = {
    marka: '',
    model: '',
    city: '',
    ban: '',
    year: '',
    price: null,
    image: ''
  };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {
    this.yearOptions = this.makeYears(1990, new Date().getFullYear());
  }

  private makeYears(from: number, to: number): string[] {
    const res: string[] = [];
    for (let y = to; y >= from; y--) res.push(String(y));
    return res;
  }

  onBrandChange() {
    this.modelOptions = this.modelsByBrand[this.form.marka] ?? [];
    this.form.model = '';
  }

  get isValid(): boolean {
    const f = this.form;
    return !!(f.marka && f.model && f.city && f.ban && f.year && f.price && f.image);
  }

 submit() {
  if (!this.isValid) {
    this.error = 'Bütün sahələri doldurun!';
    return;
  }

  const user = this.authService.getCurrentUser();
  if (!user) {
    this.error = 'Elan yerləşdirmək üçün login olun!';
    return;
  }

  const newAd: Omit<Post, 'id'> = {
    marka: this.form.marka,
    model: this.form.model,
    city: this.form.city,
    ban: this.form.ban,
    year: this.form.year,
    price: this.form.price!,
    image: this.form.image,
    ownerId: user.id!,
    createdAt: new Date().toISOString()
  };

  this.postService.addPost(newAd).subscribe({
    next: (createdPost) => {
      const updatedUser: User = {
        ...user,
        ads: [...user.ads, createdPost.id] // id indi string-dir
      };

      this.authService.updateUser(updatedUser).subscribe(() => {
        this.success = 'Elan uğurla əlavə olundu!';
        this.error = '';
        this.reset();
        this.router.navigate(['/cars', createdPost.id]);
      });
    },
    error: () => {
      this.error = 'Elan əlavə edilərkən xəta baş verdi!';
    }
  });
}


  reset() {
    this.form = { marka: '', model: '', city: '', ban: '', year: '', price: null, image: '' };
    this.modelOptions = [];
  }
}
