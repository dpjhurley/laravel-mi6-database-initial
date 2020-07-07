<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mission;
use App\Person;

class MissionController extends Controller
{
    public function index()
    {
        $missions = Mission::all();

        return $missions;
    }

    public function addMission(Request $request)
    {
        $person_id = $request->input('person_id');
        $mission_id = $request->input('mission_id');

        $mission = Mission::findOrFail($mission_id);
        $mission->people()->attach($person_id);

        return Person::findOrFail($person_id)->missions;
    }

    public function removeMission(Request $request)
    {
        $person_id = $request->input('person_id');
        $mission_id = $request->input('mission_id');

        $mission = Mission::findOrFail($mission_id);
        $mission->people()->detach($person_id);
        
        return Person::findOrFail($person_id)->missions;
    }
}
