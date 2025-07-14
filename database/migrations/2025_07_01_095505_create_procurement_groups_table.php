<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procurement_groups', function (Blueprint $table) {
            $table->id();
            $table->string('purch_grp')->unique();
            $table->string('name1')->nullable();
            $table->timestamps();
        });

        // Insert initial data
        $data = [
            ['purch_grp' => 'B01', 'name1' => 'Raw Materials - Manufactured'],
            ['purch_grp' => 'B02', 'name1' => 'Raw Materials - Agricultural'],
            ['purch_grp' => 'B03', 'name1' => 'Packaging'],
            ['purch_grp' => 'B04', 'name1' => 'IT, Equipment, Parts, Vehicles, R&M - Plant, Warehouse, HO'],
            ['purch_grp' => 'B05', 'name1' => 'Equipment, Parts, R&M - Stores, Furnitures & Fixtures'],
            ['purch_grp' => 'B06', 'name1' => 'Construction, Signages & Racks - Stores'],
            ['purch_grp' => 'B07', 'name1' => 'Marketing & Uniforms'],
            ['purch_grp' => 'B08', 'name1' => 'Supplies'],
            ['purch_grp' => 'B09', 'name1' => 'Sugar & Sweeteners, Fats & Oils, Flour & Starches'],
            ['purch_grp' => 'B10', 'name1' => 'Logistics & Services'],
            ['purch_grp' => 'B11', 'name1' => 'Fuel, Hardware & Tools, IT Out of Scope'],
            ['purch_grp' => 'B12', 'name1' => 'Construction, Signages & Racks - Office, Plants & Warehouse'],
            ['purch_grp' => 'B13', 'name1' => 'Construction, Signages & Racks - Office, Plants & Warehouse 2'],
            ['purch_grp' => 'B14', 'name1' => 'Construction, Signages & Racks - Stores 2'],
            ['purch_grp' => 'B15', 'name1' => null],
        ];

        DB::table('procurement_groups')->insert($data);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_groups');
    }
};
