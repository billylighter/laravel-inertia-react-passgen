import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function PasswordGenerator() {
    const { props } = usePage();
    const { status, generatedPasswords } = props;

    const { data, setData, post, processing, errors } = useForm({
        length: 12,
        count: 1,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
    });

    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (pass, index) => {
        navigator.clipboard.writeText(pass);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.generate'));
    };

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 transition-colors duration-500">

            {generatedPasswords && (
                <div className="space-y-2 mt-4">
                    {generatedPasswords.map((pass, idx) => (
                        <div
                            key={idx}
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 flex justify-between items-center transition-colors duration-300"
                        >
                            <span className="font-mono text-sm text-gray-800 dark:text-gray-100 break-all">
                                {pass}
                            </span>

                            <button
                                onClick={() => handleCopy(pass, idx)}
                                className={`
                                    select-none px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300
                                    ${copiedIndex === idx
                                    ? 'bg-green-600 text-white'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'}
                                `}
                            >
                                {copiedIndex === idx ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="flex">
                    <div>
                        <InputLabel htmlFor="length" value="Length" className="text-gray-700 dark:text-gray-200" />
                        <TextInput
                            id="length"
                            type="number"
                            min="4"
                            max="64"
                            value={data.length}
                            onChange={(e) => setData('length', e.target.value)}
                            className="mt-1 block w-24 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                        />
                        <InputError message={errors.length} className="mt-2 text-red-500 dark:text-red-400" />
                    </div>

                    <div className="ml-4">
                        <InputLabel htmlFor="count" value="Amount" className="text-gray-700 dark:text-gray-200" />
                        <TextInput
                            id="count"
                            type="number"
                            min="1"
                            max="50"
                            value={data.count}
                            onChange={(e) => setData('count', e.target.value)}
                            className="mt-1 block w-24 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
                        />
                        <InputError message={errors.count} className="mt-2 text-red-500 dark:text-red-400" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                        <Checkbox
                            name="numbers"
                            checked={data.numbers}
                            onChange={(e) => setData('numbers', e.target.checked)}
                        />
                        <span>Numbers</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                        <Checkbox
                            name="symbols"
                            checked={data.symbols}
                            onChange={(e) => setData('symbols', e.target.checked)}
                        />
                        <span>Symbols</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                        <Checkbox
                            name="uppercase"
                            checked={data.uppercase}
                            onChange={(e) => setData('uppercase', e.target.checked)}
                        />
                        <span>Uppercase Letters</span>
                    </label>

                    <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                        <Checkbox
                            name="lowercase"
                            checked={data.lowercase}
                            onChange={(e) => setData('lowercase', e.target.checked)}
                        />
                        <span>Lowercase Letters</span>
                    </label>
                </div>

                <PrimaryButton
                    className="bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 active:bg-indigo-800 text-white transition-colors duration-300"
                    disabled={processing}
                >
                    Generate
                </PrimaryButton>
            </form>
        </div>
    );
}
