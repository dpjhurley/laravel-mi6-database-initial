<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    //
    public function people()
    {
        return $this->belongsToMany('App\Person');
    }
}
