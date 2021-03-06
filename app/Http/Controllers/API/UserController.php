<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('api');
        //$this->authorize('isAdmin');
    }

    public function index()
    {
        //$this->authorize('isAdmin');
       /* if(\Gate::allows('isAdmin') || \Gate::allows('isAuthor'))
        {*/
            return User::latest()->paginate(5);    
        //}   
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users',
            'password' => 'required|string|min:6'
        ]);

        return  User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'bio' => $request['bio'],
            'photo' => $request['photo'],
            'password' => Hash::make($request['password']),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(Request $request)
    {
        $user = auth('api')->user();

        if($request->photo)
        {
            $name = time().'.'. explode('/', explode(':',substr($request->photo, 0, strpos($request->photo,';')))[1])[1];

            \Image::make($request->photo)->save(public_path('img/').$name);

            $request->photo = $name;
        }
        
        $user->update($request->all());

        return ['message'=>"Success"];
    }

    public function profile()
    {
        return auth('api')->user();
    }

    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->all());

        return ['message'=>'Update Info.'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        

        $user = User::findOrFail($id);

        $user->delete();

        return ['message'=>'User Deleted.'];
    }

    public function search() 
    {
        if($search = \Request::get('q')) 
        {
            $users = User::where(function($query) use ($search) {
                $query->where('name','LIKE',"%$search%")
                        ->orWhere('email','LIKE',"%$search%")
                        ->orWhere('type','LIKE',"%$search%");
            })->paginate(20);
        } else {
            $users = User::latest()->paginate(5);
        }

        return $users;
    }
}
