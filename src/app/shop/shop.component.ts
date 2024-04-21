import { Component, ElementRef, NgModule, OnInit } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgImageSliderModule, AppComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  constructor(private elementRef: ElementRef){

  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }
  public images: Array<any> = [
    {
      src: '../../assets/config.svg',
      alt: 'image 1'
    },
    {
      src: '../../assets/profile.svg',
      alt: 'image 1'
    },
    {
      src: '../../assets/honor-svgrepo-com.svg',
      alt: 'image 1'
    },
    {
      src: '../../assets/picture-svgrepo-com.svg',
      alt: 'image 1'
    },
    {
      src: '../../assets/table-of-contents-svgrepo-com.svg',
      alt: 'image 1'
    },
    {
      src: '../../assets/browse-svgrepo-com.svg',
      alt: 'image 1'
    },
  ]
  public nextImage():void{
    this.images.push(this.images[0]);
    this.images.splice(0, 1);
  }
  public previousImage():void{
    this.images.splice(0, 0, this.images[this.images.length - 1]);
    this.images.pop();
  }
}
