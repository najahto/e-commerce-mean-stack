import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      // color: [''],
    });
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
    };
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
    console.log('data name', this.form.controls['name'].value);
    console.log('data', this.form.controls['icon'].value);
  }

  get categoryForm() {
    return this.form.controls;
  }
}
