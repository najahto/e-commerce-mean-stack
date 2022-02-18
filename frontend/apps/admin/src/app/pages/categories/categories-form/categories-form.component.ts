import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#ffffff'],
    });
    this._checkEditMode();
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._createCategory(category);
    }

    console.log('data name', this.form.controls['name'].value);
    console.log('data', this.form.controls['icon'].value);
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _createCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category created successfully',
        });
        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!',
        });
        console.log('error', error);
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .editCategory(this.currentCategoryId, category)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category updated successfully',
          });
          timer(2000).subscribe(() => {
            this.location.back();
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not updated!',
          });
          console.log('error', error);
        }
      );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService
          .findCategory(this.currentCategoryId)
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['icon'].setValue(category.icon);
            this.categoryForm['color'].setValue(category.color);
          });
      }
    });
  }
}
