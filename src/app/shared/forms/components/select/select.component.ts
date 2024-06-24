import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { INPUT_CONFIG } from '../../config/input.config';
import { LanguageService } from '../../../language';
import { FormValidations } from '../../form-validations';
import { TranslateModule } from '@ngx-translate/core';
import { CompareObjectIdDirective } from '../../index-forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {

  @Input({ required: true }) control!: AbstractControl<any, any> | null
  @Input({ required: true }) id!: string
  @Input({ required: true }) label!: string
  @Input({ required: true }) placeholder!: string
  @Input({ required: true }) dataSource!: any[]

  @Input({ required: true }) attributeLabel!: string
  @Input() optionTemplate: TemplateRef<any> | undefined;

  @Input() hint: string | undefined;
  @Input() hintEnd: string | undefined;
  @Input() icon: string | undefined;
  @Input() isReadOnly: boolean = false;
  @Input() textPrefix: string | undefined;
  @Input() textSuffix: string | undefined;
  @Input() multiple: boolean = false;

  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

  appearance = INPUT_CONFIG.appearance;

  constructor(
    private _languageService: LanguageService
  ) { }

  ngOnInit(): void {
    if (!this.control) {
      throw `Invalid form control. Id: [${this.id}]`
    }
  }

  getFormControl(): FormControl {
    return this.control as FormControl;
  }

  async getErrorMessage(error: any): Promise<string> {
    return await this._languageService.getTranslate(FormValidations.getErrorTranslationKey(error), error).then();
  }

  getFirstErrorTranslateKey(): string {
    const formControl: FormControl = this.getFormControl();
    if (!formControl || !formControl.errors) {
      return 'web.shared.forms.errors.noErrors';
    }
    return `web.shared.forms.errors.${Object.keys(formControl.errors)[0]}`;
  }

  compareObjectId = (obj1: any, obj2: any) => {
    return obj1?.id && obj2?.id ? obj1.id === obj2.id : obj1 === obj2;
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectionChange.emit(event)
  }

}
