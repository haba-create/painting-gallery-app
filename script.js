document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const addBtn = document.getElementById('addBtn');
    const titleInput = document.getElementById('title');
    const imageInput = document.getElementById('imageURL');
    let paintings = JSON.parse(localStorage.getItem('paintings')) || [];

    function render() {
        gallery.innerHTML = '';
        paintings.forEach((paint, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="painting">
                <h2>${paint.title}</h2>
                <img src="${paint.url}" alt="${paint.title}">
                <button data-index="${index}" class="remove">Remove</button>
            </div>`;
            gallery.appendChild(li);
        });
    }

    function addPainting() {
        const title = titleInput.value.trim();
        const url = imageInput.value.trim();
        if (!title || !url) {
            alert('Please enter title and image URL');
            return;
        }
        paintings.push({ title, url });
        localStorage.setItem('paintings', JSON.stringify(paintings));
        titleInput.value = '';
        imageInput.value = '';
        render();
    }

    function removePainting(index) {
        paintings.splice(index, 1);
        localStorage.setItem('paintings', JSON.stringify(paintings));
        render();
    }

    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const index = e.target.dataset.index;
            removePainting(index);
        }
    });
    addBtn.addEventListener('click', addPainting);
    render();
});
