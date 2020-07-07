<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:api']], function ($group) {
 
    // define your protected routes in here
    Route::get('/person', 'Api\PersonController@index');
    Route::get('/missions', 'Api\MissionController@index');
    Route::post('/missions/attach', 'Api\MissionController@addMission');
    Route::post('/missions/detach', 'Api\MissionController@removeMission');
});


Route::post('/login', 'Api\LoginController@login');