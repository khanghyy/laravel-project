<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Str;

class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index method of ProjectController.
     */
    public function test_index_method(): void
    {
        $response = $this->get('/projects');

        $response->assertStatus(200);
        // Add more assertions as needed
    }

    /**
     * Test the show method of ProjectController.
     */
    public function test_show_method(): void
    {
        $project = fake(Project::class)->create();

        $response = $this->get('/projects/' . $project->id);

        $response->assertStatus(200);
        // Add more assertions as needed
    }

    /**
     * Test the store method of ProjectController.
     */
    public function test_store_method(): void
    {
        $data = [
            'name' => 'Test Project',
            // Add more data fields as needed
            'created_by' => '1',

            'status' => 'active',
            'description' => 'Test Description',
            'updated_by' => '1',
            'image_path' => 'project/' . Str::random(),
        ];

        $response = $this->post('/projects', $data);

        $response->assertStatus(201);
        // Add more assertions as needed
    }

    /**
     * Test the update method of ProjectController.
     */
    public function test_update_method(): void
    {
        $project = fake(Project::class)->create();

        $data = [
            'name' => 'Updated Project',
            // Add more data fields as needed
        ];

        $response = $this->put('/projects/' . $project->id, $data);

        $response->assertStatus(200);
        // Add more assertions as needed
    }

    /**
     * Test the destroy method of ProjectController.
     */
    public function test_destroy_method(): void
    {
        $project = fake(Project::class)->create();

        $response = $this->delete('/projects/' . $project->id);

        $response->assertStatus(204);
        // Add more assertions as needed
    }
}
