<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(OrderSeeder::class);
        $this->call(ClientSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(EmpleadosSeeder::class);
        $this->call(ProductTableSeeder::class);

        User::factory()->create([
            'name' => 'javis developez',
            'email' => 'javis9203@gmail.com',
            'password' =>  Hash::make('javis9203'),
        ]);
    }
}
