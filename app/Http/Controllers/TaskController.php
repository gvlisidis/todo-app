<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use function Laravel\Prompts\text;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm= $request->searchTerm;

        return new TaskCollection(
            Task::query()
                ->when($searchTerm, function ($query) use ($searchTerm) {
                    $query->where('text', 'LIKE', '%' . $searchTerm . '%');
                })
                ->orderBy('created_at')
                ->get()
        );
    }

    public function complete(Task $task)
    {
        $task->update(['completed' => true]);

        return new TaskResource($task);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}
