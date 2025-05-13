

const fetchAllUrl = async () => {
    const res = await fetch('http://localhost:5000/shortUrl');
    const data = await res.json();
    return data
};

const createShortUrl = async (full) => {
    const res = await fetch('http://localhost:5000/shortUrl',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            full: full
        })
    })
    const data = await res.json();
    return data;
}

const updateEditedUrl = async (id, full) => {
    const res = await fetch(`http://localhost:5000/shortUrl/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            full: full
        })
    })
    const data = await res.json();
    return data
}

const deleteUrl = async (id) => {
    const res = await fetch(`http://localhost:5000/shortUrl/${id}`, {
        method: 'DELETE',
    })
    const data = await res.json();
    return data;
}

export {fetchAllUrl, createShortUrl, updateEditedUrl, deleteUrl}