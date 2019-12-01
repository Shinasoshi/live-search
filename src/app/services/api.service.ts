import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { DropDownOption } from '../models/drop-down-option.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // apiBase = environment.fakeApiUrl;

  constructor(private http: HttpClient) {
  }

  getFilterOptionsAvailable(): Observable<DropDownOption[]> {
    // return this.http.get(`${this.apiBase}/filters`);

    // let say it's the response we got
    const response = of([
      {
        label: 'Image',
        value: 'img'
      },
      {
        label: 'Document',
        value: 'doc'
      },
      {
        label: 'Video',
        value: 'vid'
      },
      {
        label: 'Audio',
        value: 'audio'
      }]
    );

    return response;
  }

  getElements() {
    // return this.http.get(`${this.apiBase}/elements`);

    // let say it's the response we got
    const response = of([
        {
          label: 'Image1-QWERTY',
          format: 'img'
        },
        {
          label: 'Image2-ASDFGH',
          format: 'img'
        },
        {
          label: 'Image3-ZXCVBN',
          format: 'img'
        },
        {
          label: 'Document1-QWERTY',
          format: 'doc'
        },
        {
          label: 'Document2-ASDFGH',
          format: 'doc'
        },
        {
          label: 'Document3-ZXCVBN',
          format: 'doc'
        },
        {
          label: 'Video1-QWERTY',
          format: 'vid'
        },
        {
          label: 'Video2-ASDFGH',
          format: 'vid'
        },
        {
          label: 'Video3-ZXCVBN',
          format: 'vid'
        },
        {
          label: 'Audio1-QWERTY',
          format: 'audio'
        },
        {
          label: 'Audio2-ASDFGH',
          format: 'audio'
        },
        {
          label: 'Audio3-ZXCVBN',
          format: 'audio'
        }
      ]
    );

    return response;
  }
}
