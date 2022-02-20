import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@frontend/admin/environments';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@frontend/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  catagories: Category[] = [];
  imageDisplay: string | ArrayBuffer | undefined | null;
  host = environment.host;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._createProduct(productFormData);
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      richDescription: [''],
      isFeatured: [false],
    });
  }

  private _createProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product created successfully',
        });
        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!',
        });
        console.log('error', error);
      }
    );
  }

  private _updateProduct(productData: FormData) {
    this.productsService
      .editProduct(this.currentProductId, productData)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated successfully!',
          });
          timer(2000).subscribe(() => {
            this.location.back();
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        }
      );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService
          .findProduct(this.currentProductId)
          .subscribe((product: Product) => {
            this.productForm['name'].setValue(product.name);
            this.productForm['category'].setValue(product.category?.id);
            this.productForm['brand'].setValue(product.brand);
            this.productForm['price'].setValue(product.price);
            this.productForm['countInStock'].setValue(product.countInStock);
            this.productForm['isFeatured'].setValue(product.isFeatured);
            this.productForm['description'].setValue(product.description);
            this.productForm['richDescription'].setValue(
              product.richDescription
            );
            this.imageDisplay = this.host + product.image;
            this.productForm['image'].setValidators([]);
            this.productForm['image'].updateValueAndValidity();
          });
      }
    });
  }

  private _getCategories() {
    return this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }
}
