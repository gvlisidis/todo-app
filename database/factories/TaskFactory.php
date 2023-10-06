<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'text' => $this->faker->sentence,
            'due_date' => $this->faker->dateTimeBetween(now()->subDays(rand(2,5)), now()->addDays(rand(3,10))),
            'completed' => false,
        ];
    }

    public function completed(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'completed' => true,
            ];
        });
    }
}
