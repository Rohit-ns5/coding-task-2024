import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-edit-dialog',
  templateUrl: './contact-edit-dialog.component.html',
  styleUrls: ['./contact-edit-dialog.component.css']
})

export class ContactEditDialogComponent {

  isEditMode: boolean;
  contactForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<{contact: Contact}>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contact : Contact | null
    }
  ){

    this.contactForm = new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      phoneNumber : new FormControl(),
      email : new FormControl()
    })

    // check if edit or add mode
    this.isEditMode = !!data.contact;
  }


  ngOnInit(){
    if(this.isEditMode && this.data.contact){
      this.contactForm.patchValue(this.data.contact)
      // console.log(this.contactForm.value)
    }
  }

  onSaveClick() : void {
    this.dialogRef.close({
      id : this.isEditMode ? this.data.contact?.id : -1,
      ...this.contactForm.value
    })
  }

  onCancelClick() : void {
    this.dialogRef.close();
  }

}
