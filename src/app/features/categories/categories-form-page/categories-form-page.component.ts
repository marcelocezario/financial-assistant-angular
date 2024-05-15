import { Component } from '@angular/core';
import { FormBaseDirective, LanguageService, NotificationService, StorageService } from '../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ROUTES_KEYS } from '../../../core/config';

@Component({
  selector: 'app-categories-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TranslateModule, MatButtonModule],
  templateUrl: './categories-form-page.component.html',
  styleUrl: './categories-form-page.component.scss'
})
export class CategoriesFormPageComponent extends FormBaseDirective {

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    name: [null, [Validators.required]],
    icon: [null],
    color: [null],
    active: [true],
    createdAt: [null],
    updatedAt: [null]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _languageService: LanguageService,
    private _notification: NotificationService,
    private _storageService: StorageService,
    private _router: Router
  ) {
    super()
  }

  override async submit(): Promise<void> {
    const category: Category = this.formGroup.value
    category.userId = this._storageService.getUserId()!
    await this._categoryService.create(category).then(() => {
      const translateKey = this.getTranslateKey('categoryCreatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.categories}`])
      });
    })
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.categories}`])
  }

}
