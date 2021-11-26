import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { GLOBAL } from 'src/app/services/GLOBALS';
import { UserService } from 'src/app/services/user.service';
import html2canvas from 'html2canvas';
declare const jsPDF: any;




@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  public id: any;
  public venta: any;
  public detalle_venta: any;
  public url: any;
  public total: any;
  public identity: any;
  public jsPDF: any;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
    private _userService: UserService,
    private _router: Router
  ) { 
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.downloadPDF();
  }

  ngOnInit(): void {

    if(this.identity){
      this._route.params.subscribe(params =>{
        this.id = params['id'];
  
        this._ventaService.data_venta(this.id).subscribe(
          Response =>{
            this.venta = Response.data.venta;
            this.detalle_venta = Response.data.detalles;
            console.log(this.venta);
            
          },
          error =>{
            console.log('error');
          }
        );
      });
    }else{
      this._router.navigate(['']);
    }
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      logging: true,
      letterRendering: true,
      useCORS: true,
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporteDeVenta.pdf`);
    });
  }


  



}
