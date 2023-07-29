const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const shadowElement = document.getElementById('shadow-container');
const body = document.body;
const resultsDiv = document.getElementById('results');

messageInput.addEventListener('input', function () {
    const inputText = this.value;
    if (inputText.length > 0) {
        sendBtn.classList.add('active');
        sendBtn.disabled = false;
    } else (
        sendBtn.disabled = true,
        sendBtn.className = ""
    )
})

const tooltipTriggerList = document.querySelectorAll('[data-bs-tooltip="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (items && items.length > 0) {
        items.forEach((item) => {
            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.title;

            const resultItem = document.createElement('div');
            resultItem.appendChild(link);

            resultsDiv.appendChild(resultItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.textContent = 'No results found.';
        resultsDiv.appendChild(noResults);
    }
}

function search() {
    const apiKey = 'AIzaSyDm3GVehv-NSBQQVSy5NghpUgo1m_WGJfw';
    const cxWeb = 'c0d6c1eabbf524cb5';

    const searchInput = document.getElementById('messageInput').value;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        searchInput
    )}&key=${apiKey}&cx=${cxWeb}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.items);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function startSpeechRecognition() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'ka-GE';

    var r = new Audio('/Assets/Audio/Response/this.m4a')
    var c = new Audio('/Assets/Audio/Response/Hello_how_can_i_help.mp3')

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        document.getElementById('messageInput').value = result;
        const image = document.getElementById('gigi')
        const resultsDiv = document.getElementById('results')

        resultsDiv.style.display = 'none'

        if (result.includes('გამარჯობა')) {
            c.play();
            // You can disable the search functionality here if needed.
        } else {
            // Perform the search action
            resultsDiv.style.display = 'block';
            image.style.display = 'none';
            r.play();

            setTimeout(() => {
                search();
            }, 1000);
        }
    };

    recognition.start();
}
