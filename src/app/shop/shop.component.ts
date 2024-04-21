import { Component, ElementRef, NgModule, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AppComponent],
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
      alt: 'image 2'
    },
    {
      src: '../../assets/honor-svgrepo-com.svg',
      alt: 'image 3'
    },
    {
      src: '../../assets/picture-svgrepo-com.svg',
      alt: 'image 4'
    },
    {
      src: '../../assets/table-of-contents-svgrepo-com.svg',
      alt: 'image 5'
    },
    {
      src: '../../assets/browse-svgrepo-com.svg',
      alt: 'image 6'
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
  filterResults(text: string) {
    if (!text) {
      return;
    }
    var filtered: string[] = [];

    this.images.forEach(image => {
      if(image.alt.toLowerCase().includes(text.toLowerCase())){
        filtered.push(image.alt);
      }
    });
    console.table(filtered)
    return filtered;
  }
}
