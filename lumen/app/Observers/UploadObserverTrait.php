<?php
/**
 * File: UploadObserverTrait.php
 * Created by: Luis Alberto Concha Curay.
 * Email: luisconchacuray@gmail.com
 * Language: PHP
 * Date: 12/09/17
 * Time: 00:18
 * Project: la_restaurants
 * Copyright: 2017
 */

namespace App\Observers;


use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait UploadObserverTrait
{
    protected function sendFile($model)
    {
        $field = $this->field;

        if (is_a($model->$field, UploadedFile::class) and $model->$field->isValid()) {
            $this->upload($model);
        }
    }

    protected function removeFile($model)
    {
        $field = $this->field;

        Storage::delete($this->path  . $model->$field);

    }

    protected function updateFile($model)
    {
        $field = $this->field;
        if (is_a($model->$field, UploadedFile::class) and $model->$field->isValid()) {
            $previous_image = $model->getOriginal($field);
            $this->upload($model);
            if ($previous_image) {
                Storage::delete($this->path .DIRECTORY_SEPARATOR. $previous_image);
            }
        }
    }

    protected function upload($model)
    {
        $field = $this->field;
        $extension = $model->$field->extension();
        $name = bin2hex(openssl_random_pseudo_bytes(8));
        $name = $name . '.' . $extension;

        $model->$field->storeAs($this->path, $name);
        $model->$field = $name;
    }
}