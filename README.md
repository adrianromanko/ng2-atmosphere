# ng2-atmoshphere
An Angular 2.0 Atmosphere service for connecting client applications to servers.

## Installation

```bash
npm install ng2-atmosphere
```

## Usage:
```ts
import {SocketService} from 'ng2-atmosphere'

@Component({
  selector: 'my-app',
  template:``,
  providers: [SocketService]
})
export class AppComponent implements OnInit {

  constructor(private _socketService: SocketService) {
    _socketService.dataStream.subscribe((data) => {
        console.log(data);
    });
  }

  ngOnInit() {
  }
}

```

## compilation 
```bash 
npm install
npm tsc
```

