import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from '../../model/nominatim-response/nominatim-response.model';
import {map} from 'rxjs/operators';
import { Address } from 'src/app/model/address';

export const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

@Injectable({
  providedIn: 'root'
})
export class NominatimServiceService {

  constructor(private http: HttpClient) { }

  addressLookup(address: Address): Observable<NominatimResponse[]> {
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&street=${address.street} ${address.number}&city=${address.city}&${DEFAULT_VIEW_BOX}&bounded=1&zoom=18`;
    console.log(url);
    return this.http.get(url).pipe(map((data: any) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }
}
