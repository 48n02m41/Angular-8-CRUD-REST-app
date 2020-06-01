import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.css']
})
export class CharacterAddComponent implements OnInit {

  characterForm: FormGroup;
  character_name: string = '';
  character_description: string = '';
  // character_level = null;
  // updated_at: Date = null;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.characterForm = this.formBuilder.group({
      'character_name': [null, Validators.required],
      'character_description': [null, Validators.required],
      // 'character_level': [null, Validators.required],
      // 'updated_at': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCharacter(form)
      .subscribe(res => {
        let _id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/character-details', _id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  validate: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return true;
    }
  };



}
