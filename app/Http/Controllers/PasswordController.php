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
            'type' => 'required|string|in:classic,passphrase',

            // Classic
            'length' => 'nullable|integer|min:4|max:64',
            'count' => 'required|integer|min:1|max:50',
            'numbers' => 'boolean',
            'symbols' => 'boolean',
            'uppercase' => 'boolean',
            'lowercase' => 'boolean',

            // Passphrase
            'words' => 'nullable|integer|min:2|max:10',
            'separator' => 'nullable|string|max:2',
            'capitalize' => 'boolean',
            'includeNumber' => 'boolean',
        ]);

        $passwords = [];

        for ($i = 0; $i < $validated['count']; $i++) {
            if ($validated['type'] === 'passphrase') {
                $passwords[] = $this->makePassphrase($validated);
            } else {
                $passwords[] = $this->makePassword($validated);
            }
        }

        return Redirect::route('password.index')
            ->with('generatedPasswords', $passwords);
    }

    private function makePassphrase(array $options): string
    {
        $wordList = array_filter(
            array_map('trim', explode("\n", file_get_contents(resource_path('words.txt')))),
            fn($word) => $word !== ''
        );

        if (empty($wordList)) {
            return 'default-passphrase';
        }

        $words = [];
        for ($i = 0; $i < ($options['words'] ?? 4); $i++) {
            $word = $wordList[random_int(0, count($wordList) - 1)];
            if ($options['capitalize'] ?? false) {
                $word = ucfirst($word);
            }
            $words[] = $word;
        }

        $separator = $options['separator'] ?? '-';
        $passphrase = implode($separator, $words);

        if ($options['includeNumber'] ?? false) {
            $passphrase .= $separator . random_int(0, 99);
        }

        return $passphrase;
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
