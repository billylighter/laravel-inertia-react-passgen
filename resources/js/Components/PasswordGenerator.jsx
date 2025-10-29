import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import {useState, useEffect, useRef} from 'react';

export default function PasswordGenerator() {
    const { props } = usePage();
    const { generatedPasswords } = props;

    const { data, setData, post, processing, errors } = useForm({
        type: 'classic',
        length: 12,
        count: 1,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,

        // Passphrase options
        words: 4,
        separator: '-',
        capitalize: true,
        includeNumber: true,
    });

    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (pass, index) => {
        navigator.clipboard.writeText(pass);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const submit = (e, overrides = {}) => {
        e?.preventDefault();
        post(route('password.generate'), {
            data: { ...data, ...overrides },
            preserveScroll: true,
        });
    };

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (data.type === 'classic') {
            submit(null, {
                length: 12,
                count: 1,
                numbers: true,
                symbols: true,
                uppercase: true,
                lowercase: true,
            });
        } else if (data.type === 'passphrase') {
            submit(null, {
                words: 4,
                separator: '-',
                capitalize: false,
                includeNumber: false,
                count: 1,
            });
        }
    }, [data.type]);

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">

            {generatedPasswords && (
                <div className="space-y-2 mt-4">
                    {generatedPasswords.map((pass, idx) => (
                        <div key={idx}
                            className="p-2 border rounded flex justify-between items-center border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            <span className="font-mono text-sm break-all max-w-[70%] overflow-x-auto">{pass}</span>
                            <button
                                onClick={() => handleCopy(pass, idx)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
                                    copiedIndex === idx
                                        ? 'bg-green-600 text-white'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                }`}
                            >
                                {copiedIndex === idx ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                    ))}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel value="Generation Type" className="text-gray-700 dark:text-gray-200 mb-2" />
                    <div className="flex space-x-4">
                        {['classic', 'passphrase'].map((type, index) => (
                            <div key={type} className="flex items-center me-4">
                                <input
                                    id={`type-radio-${index}`}
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={data.type === type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-4 h-4 text-indigo-500 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`type-radio-${index}`}
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                                >
                                    {type}
                                </label>
                            </div>
                        ))}

                    </div>
                </div>

                {data.type === 'classic' && (
                    <>
                        <div className="flex space-x-4">
                            <div>
                                <InputLabel htmlFor="length" value="Length" />
                                <TextInput
                                    id="length"
                                    type="number"
                                    min="4"
                                    max="64"
                                    value={data.length}
                                    onChange={(e) => setData('length', e.target.value)}
                                    className="mt-1 block w-24"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="count" value="Amount" />
                                <TextInput
                                    id="count"
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={data.count}
                                    onChange={(e) => setData('count', e.target.value)}
                                    className="mt-1 block w-24"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {['numbers', 'symbols', 'uppercase', 'lowercase'].map((opt) => (
                                <label key={opt} className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                                    <Checkbox
                                        name={opt}
                                        checked={data[opt]}
                                        onChange={(e) => setData(opt, e.target.checked)}
                                    />
                                    <span className="capitalize">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {data.type === 'passphrase' && (
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div>
                                <InputLabel htmlFor="words" value="Words" />
                                <TextInput
                                    id="words"
                                    type="number"
                                    min="2"
                                    max="10"
                                    value={data.words}
                                    onChange={(e) => setData('words', e.target.value)}
                                    className="mt-1 block w-24"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="separator" value="Separator" />
                                <TextInput
                                    id="separator"
                                    type="text"
                                    maxLength="2"
                                    value={data.separator}
                                    onChange={(e) => setData('separator', e.target.value)}
                                    className="mt-1 block w-24"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="count" value="Amount" />
                                <TextInput
                                    id="count"
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={data.count}
                                    onChange={(e) => setData('count', e.target.value)}
                                    className="mt-1 block w-24"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                                <Checkbox
                                    name="capitalize"
                                    checked={data.capitalize}
                                    onChange={(e) => setData('capitalize', e.target.checked)}
                                />
                                <span>Capitalize words</span>
                            </label>

                            <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                                <Checkbox
                                    name="includeNumber"
                                    checked={data.includeNumber}
                                    onChange={(e) => setData('includeNumber', e.target.checked)}
                                />
                                <span>Add number at end</span>
                            </label>
                        </div>
                    </div>
                )}


                <PrimaryButton className="bg-indigo-600 hover:bg-indigo-500 text-white" disabled={processing}>
                    Generate
                </PrimaryButton>
            </form>

        </div>
    );
}
