import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';
import {Gender} from '../../../model/gender/gender';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  genderList: Gender[];

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  imgSrc: string;
  check = false;

  constructor(private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Tạo mới nhân viên');
  }

  ngOnInit(): void {
    this.employeeService.getGenderList().subscribe(value => this.genderList = value);
    this.employeeForm = new FormGroup({
      employeeCode: new FormControl('', [Validators.required, Validators.pattern('^NV-\\d{4}$')]),
      salary: new FormControl('', [Validators.required, Validators.min(1000000)]),
      idCard: new FormControl('', [Validators.required, Validators.minLength(9)]),
      name: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      image: new FormControl(''),
      phone: new FormControl('', Validators.required),
      genderDto: new FormControl('', Validators.required),
      flag: new FormControl('0'),
      accountDto: new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      }, this.conparePassword)
    });
  }

  createEmployee() {
    alert('nút tạo mới');
    alert(this.employeeForm.value.accountDto.username);
    alert(this.employeeForm.value.accountDto.password);
    this.employeeService.save(this.employeeForm.value).subscribe(
      value => {alert('tạo mới thành công'); }, error => alert(error));
  }

  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.employeeForm.patchValue({image: url});
            }
            console.log('fb la:' + this.fb);
            this.imgSrc = this.fb;
            if (this.imgSrc !== '') {
              this.check = true;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  conparePassword(c: AbstractControl): any {
    const v = c.value;
    return v.password === v.confirmPassword ? null : {passwordnotmatch: true};
  }
}
