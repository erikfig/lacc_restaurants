<?php
/**
 * File: Restaurant.php
 * Created by: Luis Alberto Concha Curay.
 * Email: luisconchacuray@gmail.com
 * Language: PHP
 * Date: 10/09/17
 * Time: 23:05
 * Project: la_restaurants
 * Copyright: 2017
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Restaurant extends Model
{
    protected $path = 'restaurant/';

    protected $fillable = ['name', 'description', 'photo', 'user_id'];

    protected $appends = ['photo_full_url'];

    protected function getPhotoFullUrlAttribute()
    {
        if (!empty($this->attributes['photo'])) {
            $url = Storage::url($this->path . $this->photo);
            return \URL::to('/') . $url;
        }

        return null;
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

}