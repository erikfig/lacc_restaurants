import { Component, OnInit } from '@angular/core';
import { AppHttpService } from "../app-http.service";
import { RestaurantService } from "./restaurant.service";


@Component( {
    selector: 'app-edit',
    templateUrl: './edit.component.html'
} )

export class EditComponent implements OnInit {

    dragging: boolean      = false;
    restaurant: any        = {};
    photos: any            = [];
    photos_restaurant: any = [];
    address: any           = {};
    upload_status: string  = 'not';
    restaurantPhoto: any   = null;


    constructor( protected appHttpService: AppHttpService,
                 protected httpService: RestaurantService ) {

    }

    ngOnInit() {
        this.appHttpService.getUser()
            .then( ( res ) => {
                console.log('RES: ', res);
                let id = res.restaurant.id;

                this.httpService.builder()
                    .view( id )
                    .then( ( res ) => {
                        this.restaurant = res;
                        this.address    = res.address || {};

                        window.Materialize.updateTextFields();

                        return this.httpService.builder( '/' + this.restaurant.id + '/photos' ).list();

                    } )
                    .then( ( res ) => {
                        console.log('Aqui: ', res);
                        this.photos = res;
                    } );
            } );
    }

    //getImageSourceFromPhotoPath( img ) {
    //
    //    return this.httpService.viewImg( img )
    //        .then( ( resImg ) => {
    //            this.photos_restaurant =  resImg;
    //        } );
    //}

    upload( e ) {
        e.preventDefault();
        let image_url: any = null;

        if ( e.dataTransfer ) {
            image_url = e.dataTransfer.files[ 0 ];
        } else {
            image_url = e.target.files[ 0 ]
        }

        this.upload_status = 'sending';

        let formData = new FormData();

        formData.append( 'photo', image_url );

        this.httpService.builder()
            .upload( this.restaurant.id + '/upload', formData )
            .then( () => {
                this.upload_status = 'success';
            } )
            .catch( () => {
                this.upload_status = 'error';
            } );
    }

    dragover( e ) {
        e.stopPropagation();
        e.preventDefault();
        this.dragging = true;
    }

    searchCep() {
        let cep = this.address.cep || null;

        if ( cep && cep.length === 8 ) {
            this.httpService.getCep( cep )
                .then( ( res ) => {
                    this.address = {
                        cep: cep,
                        address: res.logradouro,
                        city: res.localidade,
                        neighborhood: res.bairro,
                        state: res.uf,
                    };
                    console.log( 'res: ', res );
                } )
        }
    }

    save( e ) {
        e.preventDefault();
        this.httpService.builder()
            .update( this.restaurant.id, this.restaurant )
            .then( () => {
                return this.httpService.builder( '/' + this.restaurant.id + '/address' )
                    .insert( this.address );
            } )
            .then( () => {

            } );
    }

    preparePhoto( e ) {
        let image_url = e.target.files[ 0 ];
        let formData  = new FormData();

        formData.append( 'restaurant_id', this.restaurant.id );
        formData.append( 'url', image_url );
        this.restaurantPhoto = formData;
        console.log( 'E: ', image_url );
    }

    sendPhoto() {
        if ( this.restaurantPhoto === null ) {
            window.Materialize.toast( 'Selecione uma imagem antes', 3000, 'red' );
            return;
        }

        this.httpService.builder()
            .upload( 'photos', this.restaurantPhoto )
            .then( () => {
                console.log( 'Obj: enviou...' );
            } );
    }


}