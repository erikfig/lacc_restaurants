import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from "../environments/environment";
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppHttpService {

    protected header: Headers;
    protected url: string;

    constructor( protected http: Http ) {
        this.setAccessToken();
    }

    request() {
        return this.http;
    }

    getUser() {
        return this.builder( 'auth/me' ).list();
    }

    setAccessToken() {

        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMxMzllYjgxM2M0MTYzZjFmNDVkMGIxOThhNTQyODVhNWZiYzkzZGJjMzgzZjRkYTU0MGRhNzNlMTQxMWMxOWE2NTRkYjU0M2U1ZmQ0NDBmIn0.eyJhdWQiOiIxIiwianRpIjoiYzEzOWViODEzYzQxNjNmMWY0NWQwYjE5OGE1NDI4NWE1ZmJjOTNkYmMzODNmNGRhNTQwZGE3M2UxNDExYzE5YTY1NGRiNTQzZTVmZDQ0MGYiLCJpYXQiOjE1MDY1NTU2MTksIm5iZiI6MTUwNjU1NTYxOSwiZXhwIjoxNTM4MDkxNjE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.osR6dKB2uJ5Q2ewOQvMLobH6cmGMDQk336PCTLENPlJ0FAz5GOiNVHkUwaHnGDiOyKpCKIBkwszlVbDgQJQos2UgIdTe5CUxy_N2OVaX82SuqH86UzwPf07vudOP-eePsDS0yt8XpRxCvL7RyGXNXO49SkUg8hb2RZ5dhCCqANtvBphCqnchEOqJsW-GD4wWLydPOLjNzxelV3pW5l6d37P0Zw_XVw3MHT6L2mjuYxI5LZSE0xcMooXcuh2joxOpFuFLXaAbKe4-fojvcpBKnewTF0XsATdATqCGYDQgp-eif1QG-_dAQwcfhiKk2zNcAcQLG1panhLqBavDdknuzeumQ5bLaJmj8BVu3HShkZVuDKEjKHvWJ4_EfALhN9zr_KO_jvm-wyxkQcf2lOjdNod5qU6s0jgHvroh3LJ14Do8V6E0Qc2LPiC4ozFG-NqUR0sIgrO_tucXrpuePORoCyAj8CBh0IhRW39x4g-ByOh-5QFaAKmz6UW4nJtznt4HhcwPdSp_MdwdarCuhaEpn8hDSYOPFdkDJ83zK8s-5FjtuGt9xsmH_LuDCCkt_wCCnqyuHV__w06aOuZL0F3-LKxZwVRUHCir4qVKlWs5fmWkhWDf_e8swO4pW-eVnEmAhc7bFnXjJL_kYNsXWA4SfubhHGeJkWoWNLsn8sLLGZU';

        this.header = new Headers( { 'Authorization': 'Bearer ' + token } );
    }

    builder( resource: string ) {
        this.url = environment.server_url + '/api/v1/' + resource;

        return this;
    }

    list( options: Object = {} ) {
        return this.http.get( this.url, { headers: this.header } )
            .toPromise()
            .then( ( res ) => {
                return res.json() || {};
            } );
    }

    view( id: number ) {
        return this.http.get( this.url + '/' + id, { headers: this.header } )
            .toPromise()
            .then( ( res ) => {
                return res.json() || {};
            } );
    }

    update( id: number, data: object ) {
        return this.http.put( this.url + '/' + id, data, { headers: this.header } )
            .toPromise()
            .then( ( res ) => {
                return res.json() || {};
            } );
    }

    insert( data: object ) {
        return this.http.post( this.url, data, { headers: this.header } )
            .toPromise()
            .then( ( res ) => {
                return res.json() || {};
            } );
    }
}