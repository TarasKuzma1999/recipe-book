import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  // @Input() testImport: string
  @Input() bankName: string | undefined;
  testImport = 'dfdf'
  myText: any = '';
  status: string = 'offline'
  servers = ['server1', 'server2']

  constructor() {
    this.status = Math.random() > 0.5 ? 'Online' : 'Offline'
  }
  ngOnInit(): void {
  }


  getColor() {
    return this.status === 'Online' ? 'green' : 'red'
  }

}
