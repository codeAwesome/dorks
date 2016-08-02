<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'uuid' => Uuid::generate(4),
            'name' => 'admin',
            'password' => bcrypt('admin1234')
        ]);
    }
}
