import { CityComponent } from './city/city.component';
import {Routes} from "@angular/router"
    import { from } from 'rxjs';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { CityAddComponent } from './city-add/city-add.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes:Routes=[
    {path:"city",component:CityComponent},
    {path:"cityadd",component:CityAddComponent},
    {path:"register",component:RegisterComponent},
    {path:"cityDetail/:cityId",component:CityDetailComponent},
    {path:"**",redirectTo:"city",pathMatch:"full"}
];
