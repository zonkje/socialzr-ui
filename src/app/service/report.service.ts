import {Injectable} from '@angular/core';
import {Post} from '../model/post.model';
import {environment} from '../../environments/environment';
import {ViolationReport} from '../model/violation-report.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {
  }

  addReport(violationReport: ViolationReport) {
    this.http.post<any>(environment.apiURL + 'report', violationReport)
      .subscribe(
        response => {
          console.log(...response.messages);
        }
      );
  }

}
