import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { AuthenticationService } from 'src/app/services/Authentication.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  lat;
  lon;
  maker;
  constructor(//private geolocation: Geolocation,
    private dbuser:UserService,
    private aut:AuthenticationService,
    private modal:ModalController
    ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let ver= this.aut.isLogin();
    
    if(ver){
      console.log("Buscando ubicacion del usuario");
        this.aut.userDetalle().then((dato:any)=>{
          console.log("user",dato.uid);
          this.dbuser.getItem(dato.uid).subscribe(s=>{
            console.log("user",s[0]);
            this.lat=s[0].lat;  
            this.lon=s[0].lon;
            this.initMap();
          })
        })
      }

    
  }
  initMap() {
    const map = new Map('map').setView([this.lat, this.lon], 12);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      zoomSnap: 17,
      zoomControl: true,
      tap: true
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.locate({ setView: true });
    map.on('click',(MouseEvent) =>{
      map.removeLayer(this.maker);
      console.log(map.getCenter());
      let x=map.getCenter();
      this.lat=x.lat;
      this.lon=x.lng;
      console.log("latlon",);
      this.maker= marker(map.getCenter(), {icon: myIcon})
      this.maker.addTo(map).openPopup();
    });

    const customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64], 
      popupAnchor: [0, -20]
    });

    var myIcon = icon({
      className: 'pizzaIcon',
      iconUrl: 'assets/icon/favicon.png',
      html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">' +
      '<g>' +
      '</g>' +
      '<path d="M249.262 255.693l229.612-39.792c1.853 12.851 3.072 26.327 3.072 39.792 0 132.239-104.1 239.401-232.684 239.401-129.188 0-233.267-107.161-233.267-239.401 0-131.625 104.079-238.776 233.267-238.776 26.327 0 52.665 4.895 77.763 13.476l-77.762 225.3zM219.259 281.385l69.796-222.843c-116.327-35.492-238.776 88.187-238.776 197.15 0 112.661 88.791 204.503 198.983 204.503 109.599 0 198.369-91.843 198.369-204.503 0-1.813 0-4.291 0-6.113l-228.373 31.805z" fill="#000000" />' +
      '<path d="M496.005 165.694c-57.579 9.175-115.108 17.746-172.647 26.962l28.15-71.055c1.229 0.635 2.457 0.635 3.666 0.635 12.872 0 23.286-12.237 23.286-26.931 0-7.966-3.082-15.944-8.601-20.828l17.767-43.459c61.87 22.006 101.642 64.276 108.38 134.677v0zM442.747 117.954c-9.8 0-17.756 7.936-17.756 17.726s7.957 17.767 17.756 17.767c9.769 0 17.736-7.977 17.736-17.767s-7.966-17.725-17.736-17.725z" fill="#000000" />' +
      '<path d="M196.004 301.609l210.617-18.985c0 1.843 0 3.676 0 5.54-0.604 15.278-3.072 28.743-6.134 40.981-6.123-8.56-15.923-14.060-27.546-14.060-18.37 0-33.045 14.060-33.045 31.222 0 17.142 14.674 31.222 33.044 31.222 1.219 0 2.447 0 3.656 0-39.782 50.821-111.431 64.901-175.094 45.302 2.447-1.802 3.686-4.885 3.686-7.936 0-7.363-6.748-13.476-14.121-13.476-7.332 0-13.445 5.519-14.060 12.237-56.34-25.723-99.82-80.2-96.133-157.962 3.666-92.436 79.616-208.793 178.155-178.78l-63.027 224.696zM260.894 322.447c-12.216 0-22.026 9.165-22.026 20.777 0 11.643 9.81 20.839 22.026 20.839 11.653 0 21.442-9.195 21.442-20.839-0.010-11.612-9.8-20.777-21.442-20.777v0zM128.030 285.686c-15.933 0-28.16 13.476-28.16 31.222 0 17.183 12.227 30.618 28.16 30.618 15.309 0 28.17-13.445 28.17-30.618 0-17.736-12.862-31.222-28.17-31.222v0zM167.823 172.431c-11.623 0-20.797 9.175-20.797 20.224 0 10.998 9.175 20.194 20.798 20.194 11.653 0 20.818-9.185 20.818-20.194 0-11.049-9.175-20.224-20.818-20.224z" fill="#000000" />' +
      '</svg>',
      iconSize: [32, 32]
    })
   this.maker= marker([40.4, -3.7], {icon: myIcon});
   this.maker.addTo(map).openPopup();
 
  }
  enviar(){
    this.modal.dismiss({lat:this.lat,lon:this.lon});
  }
}
