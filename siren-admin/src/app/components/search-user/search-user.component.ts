import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: Array<any> = []

  constructor(private http:HttpClient) { }

  filter(username: string, sirens_low: string, sirens_high: string, description: string) {
    this.http.get<any>("/api/admins/users?user="+username+"&sirens_low="+sirens_low+"&sirens_high="+sirens_high+"&description="+description).subscribe(
      data => this.users = data,
      error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

}
