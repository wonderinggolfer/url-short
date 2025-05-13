import { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [input, setInput] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
        setInput('')
    }


  return (
    <form onSubmit={handleSubmit} className='flex gap-3 mb-5'>
        <input 
            type='url'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your URL'
            required
            className='flex-1 p-3 border rounded'
        />
        <button
            type='submit'
            className='bg-green-600 hover:bg-green-800 text-white px-3 py-3 rounded'
        >
            Submit
        </button>
    </form>
  )
}

export default Form