import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ViolationReport} from '../../model/violation-report.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  authorId: number;
  reportedUserId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.authorId = JSON.parse(localStorage.getItem('loggedUserData'))['id'];
    this.route.params.subscribe(params => this.reportedUserId = params['id']);
    if(this.authorId == this.reportedUserId){
      console.log("The reporting author ID must be different from the reported user ID");
      this.onCancel();
    }
    this.initForm();
  }


  onSubmit() {
    const violationReport = new ViolationReport(
      null,
      null,
      null,
      this.reportForm.value['text'],
      this.authorId,
      this.reportedUserId
    );
    this.reportService.addReport(violationReport);
    console.log(violationReport);
    this.onCancel();
  }

  private initForm() {
    let reportText = '';

    this.reportForm = new FormGroup({
      'text': new FormControl(reportText, Validators.required)
    });
  }

  onCancel() {
    this.router.navigate(['post']);
  }

}
