import { useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState('World');
    const [greeting, setGreeting] = useState('Click Greet to call C#');
    const [isLoading, setIsLoading] = useState(false);

    const handleGreet = async () => {
        setIsLoading(true);
        try {
            const result = await window.__ryn.invoke('app.greet', { name });
            setGreeting(result as string);
        } catch (error) {
            setGreeting(`Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1>RynViteTest2</h1>
            <p>Built with Ryn + Vite</p>
            <div className="card">
                <h2>Try IPC</h2>
                <div className="row">
                    <fieldset className="fieldset">
                        <input type="text" className="input" placeholder="Type here" onChange={(e) => setName(e.target.value)} />
                        <p className="label">Ingresa tu nombre</p>
                    </fieldset>
                    <button className='btn btn-primary btn-medium' onClick={handleGreet} disabled={isLoading}>
                        {isLoading ? 'Greeting...' : 'Greet'}
                    </button>
                </div>
                <div className="result">{greeting}</div>
            </div>
        </>
    );
}

export default App
