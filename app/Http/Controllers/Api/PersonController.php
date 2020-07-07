<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Person;
use Croppa;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::query()
            ->with('image')
            ->with('missions')
            // ->orderBy('name', 'asc')
            ->limit(20)
            ->get();

        foreach ($people as $person) {
            if ($person->image) {
                $person->image_url = Croppa::url('imgs/'.$person->image->path, 100, null, ['resize']);
            }
        }

        return $people;
    }

}
