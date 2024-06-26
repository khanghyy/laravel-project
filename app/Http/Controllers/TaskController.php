<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10);


        $tasks = $query->paginate(10);
        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Tasks/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $file = $request->file('image');
            $file_name = time() . '.' . $file->getClientOriginalName();
            $file->move(public_path('images'), $file_name);
            $data['image_path'] = 'images/' . $file_name;
        }
        Task::create($data);
        return to_route('task.index')->with('success', 'task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Tasks/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Tasks/Edit', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'task' => new TaskResource($task),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $file = $request->file('image');
            $file_name = time() . '.' . $file->getClientOriginalName();
            $file->move(public_path('images'), $file_name);
            $data['image_path'] = 'images/' . $file_name;
        }
        $task->update($data);

        return to_route('task.index')
            ->with('success', "task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('task.index')
            ->with('success', "task \"$name\" was deleted");
    }
    public function myTasks()
    {


        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10);


        $tasks = $query->paginate(10);
        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),

        ]);
    }
}
