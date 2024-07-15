import { ActivatedRoute, Router } from '@angular/router';
import { Category, ClassificationType } from '../../../core/models';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBaseDirective, FormValidations, InputColorComponent, InputComponent, InputIconComponent, LanguageService, NotificationService, StorageService } from '../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ROUTES_KEYS } from '../../../core/config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-form-page',
  standalone: true,
  imports: [
    CommonModule,
    InputColorComponent,
    InputComponent,
    InputIconComponent,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './categories-form-page.component.html',
  styleUrl: './categories-form-page.component.scss'
})
export class CategoriesFormPageComponent extends FormBaseDirective implements OnInit {

  ClassificationType = ClassificationType

  override formGroup: FormGroup<any> = this._formBuilder.group({
    id: [null],
    name: [null, [Validators.required, Validators.minLength(3)]],
    color: [null, [FormValidations.hexadecimalColor()]],
    icon: [null],
    type: [null, [Validators.required]],
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
        .then(category => {
          this.formGroup.patchValue(category)
          console.warn(this.formGroup.value)
          this.formGroup.get('type')?.disable()
          console.error(this.formGroup.value)
        })
        .catch(() => this._router.navigate([`/${ROUTES_KEYS.categories}`]))
    }
  }

  override async submit(): Promise<void> {
    const category: Category = this.formGroup.getRawValue()
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
