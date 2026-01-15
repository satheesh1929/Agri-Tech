document.addEventListener('DOMContentLoaded', () => {
    console.log("Agri Tech Initialized");

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let currentLang = 'en'; // 'en' or 'ta'

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ta' : 'en';
            updateLanguage();
        });
    }

    function updateLanguage() {
        // Toggle Button Text
        langText.innerText = currentLang === 'en' ? 'தமிழ்' : 'English';

        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                // If the element has children (like icons), we need to be careful not to wipe them
                // For simple text nodes:
                if (el.children.length === 0) {
                    el.innerText = text;
                } else {
                    // For buttons with icons, usually the text is in a span or text node
                    // Let's assume most text is straightforward, for complex ones we might need spans
                    // For the Highlight span, it's just text
                    el.innerText = text;
                }
            }
        });
    }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- IoT Detail Toggle ---
    window.toggleIotDetail = function (id) {
        const el = document.getElementById(id);
        el.classList.toggle('hidden');
    }

    // --- Detailed Advisory Logic ---
    const advisoryData = {
        'paddy': {
            'fertilizer': "Urea: 50kg/acre (Split dose) | DAP: 20kg",
            'pest': "Watch for Stem Borer & Leaf Blast. Use Neem oil.",
            'water': "Maintain 2-5cm water level. Drain before harvest."
        },
        'cotton': {
            'fertilizer': "Urea: 30kg | Potash: 10kg | Zinc Sulfate",
            'pest': "Bollworm alert! Install pheromone traps.",
            'water': "Avoid water logging. Irrigate every 10-15 days."
        },
        'maize': {
            'fertilizer': "NPK: 120:60:40 kg/ha recommended.",
            'pest': "Fall Armyworm risk. Check whorls for damage.",
            'water': "Critical stages: Tasseling & Silking."
        }
    };

    const cropForm = document.getElementById('crop-form');
    if (cropForm) {
        cropForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const crop = document.getElementById('crop').value;
            const district = document.getElementById('district').value;

            if (!crop || !district) {
                alert("Please select Crop and District");
                return;
            }

            // Show result container
            document.getElementById('advisory-result').classList.remove('hidden');

            // Fetch logic
            let data = advisoryData[crop];
            if (!data) {
                // Fallback
                data = {
                    'fertilizer': "General NPK recommendation: 100:50:50",
                    'pest': "Monitor for local pests daily.",
                    'water': "Irrigate based on soil moisture."
                };
            }

            // Update UI
            document.getElementById('res-fertilizer').innerText = data.fertilizer;
            document.getElementById('res-pest').innerText = data.pest;
            document.getElementById('res-water').innerText = data.water;
        });
    }

    // Close result
    document.getElementById('close-result').addEventListener('click', () => {
        document.getElementById('advisory-result').classList.add('hidden');
    });

});
