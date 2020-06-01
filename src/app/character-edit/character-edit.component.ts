import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  characterForm: FormGroup;
  _id: string = '';
  character_name: string = '';
  character_description: string = '';
  // character_level = null;
  // updated_at: Date = null;
  isLoadingResults = false;

  validate: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return true;
    }
  };

  ngOnInit() {
    this.getCharacter(this.route.snapshot.params['id']);
    this.characterForm = this.formBuilder.group({
      'character_name': [null, Validators.required],
      'character_description': [null, Validators.required],
      // 'character_level': [null, Validators.required],
      // 'updated_at': [null, Validators.required]
    });
  }

  getCharacter(id) {
    this.api.getCharacter(id)
      .subscribe(data => {
        this._id = data._id;
        this.characterForm.setValue({
          character_name: data.character_name,
          character_description: data.character_description
        });
      });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCharacter(this._id, form)
      .subscribe(res => {
        let _id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/character-details', _id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  characterDetails() {
    this.router.navigate(['character-details', this._id]);
  }

}
