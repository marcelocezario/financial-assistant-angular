import { Component, OnInit } from '@angular/core';
import { FormBaseDirective, FormValidations, InputColorComponent, InputIconComponent, LanguageService, NotificationService, StorageService } from '../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../../../core/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_KEYS } from '../../../core/config';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, TranslateModule, MatButtonModule, MatIconModule, InputColorComponent, InputIconComponent],
  templateUrl: './categories-form-page.component.html',
  styleUrl: './categories-form-page.component.scss'
})
export class CategoriesFormPageComponent extends FormBaseDirective implements OnInit {

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    name: [null, [Validators.required]],
    color: [null, [FormValidations.hexadecimalColor()]],
    icon: [null],
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
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('categoryId');
    if (id) {
      this._categoryService.getByIdAndUser(id)
        .then(category => this.formGroup.patchValue(category))
        .catch(() => this._router.navigate([`/${ROUTES_KEYS.categories}`]))
    }
  }

  override async submit(): Promise<void> {
    const category: Category = this.formGroup.value
    category.userId = this._storageService.getUserId()!
    if (category.id) {
      await this._update(category).then();
    } else {
      await this._create(category).then();
    }
  }

  override cancel(): void {
    this._router.navigate([`/${ROUTES_KEYS.categories}`])
  }

  async _create(category: Category) {
    await this._categoryService.create(category).then(() => {
      const translateKey = this.getTranslateKey('categoryCreatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.categories}`])
      });
    })
  }

  async _update(category: Category) {
    await this._categoryService.update(category).then(() => {
      const translateKey = this.getTranslateKey('categoryUpdatedSuccessfully');
      this._languageService.getTranslate(translateKey).then(message => {
        this._notification.success(message)
        this._router.navigate([`/${ROUTES_KEYS.categories}`])
      });
    })
  }

}
