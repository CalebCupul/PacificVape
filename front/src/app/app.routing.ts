import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from "./components/productos/producto-index/producto-index.component";
import { ProductoCreateComponent } from "./components/productos/producto-create/producto-create.component";
import { ProductoEditComponent } from "./components/productos/producto-edit/producto-edit.component";
import { ClienteIndexComponent } from "./components/clientes/cliente-index/cliente-index.component";
import { ClienteCreateComponent } from "./components/clientes/cliente-create/cliente-create.component";
import { ClienteEditComponent } from "./components/clientes/cliente-edit/cliente-edit.component";

const appRoute : Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'productos', component: ProductoIndexComponent },
    { path: 'producto/registrar', component: ProductoCreateComponent },
    { path: 'producto/registro/:id', component: ProductoEditComponent },
    { path: 'clientes', component: ClienteIndexComponent },
    { path: 'cliente/registrar', component: ClienteCreateComponent },
    { path: 'cliente/editar/:id', component: ClienteEditComponent }
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);