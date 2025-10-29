<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{

    public function index(Request $request): Response
    {
        if (!session()->has('generatedPasswords')) {
            $defaultPasswords = [$this->makePassword([
                'length' => 12,
                'numbers' => true,
                'symbols' => true,
                'uppercase' => true,
                'lowercase' => true,
            ])];

            session([
                'generatedPasswords' => $defaultPasswords
            ]);
        }

        return Inertia::render('Welcome', [
            'generatedPasswords' => session('generatedPasswords'),
        ]);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'length' => 'required|integer|min:4|max:64',
            'count' => 'required|integer|min:1|max:50',
            'numbers' => 'boolean',
            'symbols' => 'boolean',
            'uppercase' => 'boolean',
            'lowercase' => 'boolean',
        ]);

        $passwords = [];
        for ($i = 0; $i < $validated['count']; $i++) {
            $passwords[] = $this->makePassword($validated);
        }

        return Redirect::route('password.index')
            ->with('generatedPasswords', $passwords);
    }

    private function makePassword(array $options): string
    {
        $characters = '';
        if ($options['lowercase'] ?? true) $characters .= 'abcdefghijklmnopqrstuvwxyz';
        if ($options['uppercase'] ?? true) $characters .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if ($options['numbers'] ?? true) $characters .= '0123456789';
        if ($options['symbols'] ?? true) $characters .= '!@#$%^&*()-_=+[]{};:,.<>?';

        if ($characters === '') return '';

        $password = '';
        $length = $options['length'] ?? 12;

        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[random_int(0, strlen($characters) - 1)];
        }

        return $password;
    }
}
