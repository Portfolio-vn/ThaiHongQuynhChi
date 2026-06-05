const studentEvents = [
    {
        "id": "chi_aijam",
        "title": "Gold Award - AI JAM US 2025 (Giải Vàng cuộc thi AI JAM US 2025)",
        "category": "Awards / Achievements",
        "date": "2025",
        "desc": "Won the prestigious Gold Award at the AI JAM US Innovation Competition in 2025. Presented artificial intelligence pharmacognosy applications to automate plant extraction efficiency and predict SAPONIN yields.",
        "assets": [
            {
                "name": "AI JAM US Gold Award Certificate (Chứng nhận Giải Vàng AI JAM)",
                "path": "assets/extracurricular/ai_jam_2025_gold_award.pdf",
                "is_pdf": true,
                "is_video": false
            }
        ],
        "keywords": [
            "ai jam",
            "quynh_chi.pdf"
        ]
    },
    {
        "id": "chi_radiation",
        "title": "Scientific Research: Nutrition for Radiotherapy Patients (Đề tài Dinh dưỡng cho bệnh nhân xạ trị)",
        "category": "Scientific Research",
        "date": "2025-2026",
        "desc": "Co-authored scientific research analyzing nutritional support and bio-extraction remedies to prevent physical degradation in oncology patients undergoing radiation treatment.",
        "assets": [
            {
                "name": "Scientific Paper - Radiotherapy Nutrition (Báo cáo đề tài nghiên cứu Dinh dưỡng)",
                "path": "assets/extracurricular/radiotherapy_nutrition_research.pdf",
                "is_pdf": true,
                "is_video": false
            }
        ],
        "keywords": [
            "nutrition",
            "radiotherapy"
        ]
    },
    {
        "id": "chi_extraction",
        "title": "Personal Research: Centella Saponin Extraction (Chiết xuất Saponin & Bào chế Bio-gel)",
        "category": "Personal Product",
        "date": "2025",
        "desc": "Conducted research on the extraction of high-purity Saponin from Centella Asiatica and Cinnamon Cinnamaldehyde, developing a biofilm antiseptic formulation for skin wound-healing gels.",
        "assets": [
            {
                "name": "Bio-gel Research Presentation (Bài thuyết trình dự án Saponin)",
                "path": "assets/extracurricular/creative_portfolio.pdf",
                "is_pdf": true,
                "is_video": false
            },
            {
                "name": "AI JAM US Gold Award (Chứng nhận Giải Vàng AI JAM)",
                "path": "assets/extracurricular/ai_jam_2025_gold_award.pdf",
                "is_pdf": true,
                "is_video": false
            }
        ],
        "keywords": [
            "extraction",
            "saponin"
        ]
    },
    {
        "id": "chi_sos",
        "title": "SOS Children's Village Volunteering (Tình nguyện Làng trẻ SOS)",
        "category": "Social Activities",
        "date": "2025",
        "desc": "Organized volunteer cultural classes, science demonstration activities, and raised funds for community support at the SOS Children's Village in August 2025.",
        "assets": [
            {
                "name": "SOS Children's Village Report (Báo cáo hoạt động Làng trẻ SOS)",
                "path": "assets/extracurricular/sos_volunteer_2025.pdf",
                "is_pdf": true,
                "is_video": false
            }
        ],
        "keywords": [
            "sos",
            "volunteer"
        ]
    },
    {
        "id": "ev_other_certs",
        "title": "Official Academic Credentials (Chứng chỉ học thuật & Hồ sơ cá nhân)",
        "category": "Academic / Credentials",
        "date": "2025-2026",
        "desc": "Compilation of standardized test score sheets (SAT, IELTS, AP Chemistry) and verified high school academic transcripts.",
        "assets": [
            {
                "name": "IELTS Academic TRF (Bảng điểm IELTS 8.5)",
                "path": "assets/academic/ielts_report.pdf",
                "is_pdf": true,
                "is_video": false
            },
            {
                "name": "SAT Score Report (Bảng điểm SAT 1600)",
                "path": "assets/academic/sat_score_weekend.pdf",
                "is_pdf": true,
                "is_video": false
            },
            {
                "name": "SAT/AP Chemistry Report (Chứng nhận điểm AP Hóa học 5/5)",
                "path": "assets/academic/sat_ap_score_report.pdf",
                "is_pdf": true,
                "is_video": false
            },
            {
                "name": "High School Transcripts - 9, 10, 11 (Học bạ Trung học Phổ thông)",
                "path": "assets/academic/high_school_transcripts.pdf",
                "is_pdf": true,
                "is_video": false
            },
            {
                "name": "Passport Credentials (Hộ chiếu cá nhân)",
                "path": "assets/identity/passport.pdf",
                "is_pdf": true,
                "is_video": false
            }
        ],
        "keywords": [
            "certs",
            "score"
        ]
    }
];

// PDF VIEW AND PREVIEW RENDER SYSTEM
async function renderPDFPreview(pdfPath, canvasElement, placeholderElement) {
    try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = canvasElement;
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        canvas.classList.add('loaded');
        
        if (placeholderElement) {
            placeholderElement.style.opacity = '0';
            setTimeout(() => {
                placeholderElement.style.display = 'none';
            }, 400);
        }
    } catch (error) {
        console.error("PDF.js failed to render page preview for path:", pdfPath, error);
        if (placeholderElement) {
            placeholderElement.innerHTML = `
                <i class="fas fa-file-pdf" style="color: var(--accent);"></i>
                <span style="font-size:10px;">PDF View Available</span>
            `;
        }
    }
}

function openPDFViewer(pdfUrl, title) {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-iframe');
    const titleSpan = document.getElementById('pdf-modal-title');
    const downloadBtn = document.getElementById('pdf-download-btn');
    
    if (modal && iframe) {
        titleSpan.innerText = title || "Document Viewer";
        downloadBtn.href = pdfUrl;
        iframe.src = pdfUrl;
        modal.style.display = 'flex';
    }
}

function closePDFViewer() {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-iframe');
    if (modal && iframe) {
        iframe.src = '';
        modal.style.display = 'none';
    }
}

// Setup all page PDF previews & button behaviors
function initPDFSystem() {
    const mainGalleryCards = document.querySelectorAll('.certs-grid .gallery-card');
    mainGalleryCards.forEach(card => {
        setupCardPDFPreview(card);
    });
}

function setupCardPDFPreview(card) {
    const viewBtn = card.querySelector('.view-btn');
    const wrapper = card.querySelector('.card-img-wrapper');
    const placeholder = card.querySelector('.pdf-preview-placeholder');
    
    if (viewBtn && wrapper) {
        const pdfUrl = viewBtn.getAttribute('href');
        
        if (pdfUrl.toLowerCase().endsWith('.pdf')) {
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-canvas-preview';
            wrapper.appendChild(canvas);
            
            renderPDFPreview(pdfUrl, canvas, placeholder);
            
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openPDFViewer(pdfUrl, card.querySelector('h4').getAttribute('title') || card.querySelector('h4').innerText);
            });
            
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                    openPDFViewer(pdfUrl, card.querySelector('h4').getAttribute('title') || card.querySelector('h4').innerText);
                }
            });
        }
    }
}

// Ingredient → research image mapping
const ingredientImages = {
    'rau-ma': {
        src: 'assets/images/research/raoma.png',
        label: 'Centella Asiatica (Rau má)',
        caption: 'Saponin extraction source plant'
    },
    'cinnamaldehyde': {
        src: 'assets/images/research/measua.png',
        label: 'Cinnamaldehyde (Quế)',
        caption: 'Cinnamon bioactive compound'
    },
    'gel-base': {
        src: 'assets/images/research/tuong.png',
        label: 'Emulsion Gel (Gel nhũ tương)',
        caption: 'Bio-gel formulation base'
    },
    'solvent': {
        src: 'assets/images/research/hoanthien.png',
        label: 'Ethanol Solvent (Dung môi)',
        caption: 'Extraction solvent medium'
    }
};

function updateLabVisuals() {
    const grid = document.getElementById('lab-visuals-grid');
    const hint = document.querySelector('.lab-visuals-hint');
    if (!grid) return;
    grid.innerHTML = '';
    if (selectedIngredients.length === 0) {
        if (hint) hint.style.display = 'block';
        return;
    }
    if (hint) hint.style.display = 'none';
    selectedIngredients.forEach(ing => {
        const data = ingredientImages[ing];
        if (!data) return;
        const card = document.createElement('div');
        card.className = 'lab-visual-card';
        card.innerHTML = `
            <img src="${data.src}" alt="${data.label}" loading="lazy">
            <div class="lab-visual-info">
                <strong>${data.label}</strong>
                <span>${data.caption}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Setup lab mixer ingredients and action
const ingredients = document.querySelectorAll('.ing-item');
const beakerFluid = document.getElementById('fluid-level');
const bubblesContainer = document.getElementById('bubbles-container');
const outputLog = document.getElementById('lab-output-log');
let selectedIngredients = [];

ingredients.forEach(item => {
    item.addEventListener('click', () => {
        const ing = item.getAttribute('data-ing');
        item.classList.toggle('selected');
        if (item.classList.contains('selected')) {
            selectedIngredients.push(ing);
        } else {
            selectedIngredients = selectedIngredients.filter(x => x !== ing);
        }
        const level = (selectedIngredients.length / ingredients.length) * 80;
        beakerFluid.style.height = `${level}%`;
        
        if (selectedIngredients.includes('rau-ma') && selectedIngredients.includes('solvent')) {
            beakerFluid.style.background = 'rgba(16, 185, 129, 0.6)'; // Mint green
        } else if (selectedIngredients.includes('cinnamaldehyde') && selectedIngredients.includes('gel-base')) {
            beakerFluid.style.background = 'rgba(212, 140, 140, 0.6)'; // Soft Dusty Rose
        } else {
            beakerFluid.style.background = 'rgba(139, 92, 246, 0.4)'; // Soft Silk Lavender
        }

        updateLabVisuals();
    });
});

function formulateLab() {
    if (selectedIngredients.length < 2) {
        outputLog.innerHTML = `<h3>Reaction Result:</h3><p class="status-msg" style="color: var(--accent); font-weight: 700;">Error: Please select at least 2 ingredients!</p>`;
        return;
    }
    bubblesContainer.innerHTML = '';
    for(let i=0; i<15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 90}%`;
        bubble.style.animationDelay = `${Math.random() * 1.5}s`;
        bubblesContainer.appendChild(bubble);
    }
    setTimeout(() => {
        let title = ""; let msg = "";
        const hasRauMa = selectedIngredients.includes('rau-ma');
        const hasSolvent = selectedIngredients.includes('solvent');
        const hasGel = selectedIngredients.includes('gel-base');
        const hasCinnamon = selectedIngredients.includes('cinnamaldehyde');
        if (hasRauMa && hasSolvent && hasGel) {
            title = "SAPONIN EXTRACTION SUCCESSFUL!";
            msg = "Successfully formulated scar treatment gel from Centella Saponin. 98% antibacterial activity! (Personal Project)";
        } else if (hasCinnamon && hasGel) {
            title = "CINNAMALDEHYDE GEL FORMULATED!";
            msg = "Successfully extracted Cinnamaldehyde from cinnamon and emulsified gel. Medical biofilm inhibition! (Innova Croatia 2025 Award)";
        } else {
            title = "CHEMICAL REACTION OCCURRED";
            msg = "Ingredients dissolved. Hint: Mix Centella Saponin + Ethanol Solvent + Emulsion Gel Base to synthesize wound-healing gel.";
        }
        outputLog.innerHTML = `<h3>Reaction Result:</h3><h4 style="color: var(--primary); margin-bottom:8px; font-weight:800;">${title}</h4><p style="font-weight: 500;">${msg}</p>`;
    }, 1000);
}

function resetLab() {
    selectedIngredients = [];
    ingredients.forEach(item => item.classList.remove('selected'));
    beakerFluid.style.height = '0%';
    bubblesContainer.innerHTML = '';
    outputLog.innerHTML = `<h3>Reaction Result:</h3><p class="status-msg">Select at least 2 ingredients on the left to add to the Erlenmeyer flask.</p>`;
    updateLabVisuals();
}

// Particle field effect (Chemistry atoms floating concept)
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    function setSize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', setSize);
    setSize();
    class Particle {
        constructor() { 
            this.x = Math.random() * canvas.width; 
            this.y = Math.random() * canvas.height; 
            this.size = Math.random() * 3 + 1; 
            this.speedX = Math.random() * 0.5 - 0.25; 
            this.speedY = Math.random() * 0.5 - 0.25; 
            this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.12)' : 'rgba(212, 140, 140, 0.12)'; 
        }
        update() { 
            this.x += this.speedX; 
            this.y += this.speedY; 
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX; 
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY; 
        }
        draw() { 
            ctx.fillStyle = this.color; 
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
            ctx.fill(); 
        }
    }
    for (let i = 0; i < 50; i++) { particlesArray.push(new Particle()); }
    function animate() { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        for (let i = 0; i < particlesArray.length; i++) { 
            particlesArray[i].update(); 
            particlesArray[i].draw(); 
        } 
        requestAnimationFrame(animate); 
    }
    animate();
}

// Regular image click viewer modal
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

if (closeModal) closeModal.addEventListener('click', () => { modal.style.display = "none"; });
window.addEventListener('click', (e) => { 
    if (e.target === modal) modal.style.display = "none"; 
    
    const pdfModal = document.getElementById('pdf-viewer-modal');
    if (e.target === pdfModal) {
        closePDFViewer();
    }
});

// INTERACTIVE DETAILS MODAL
function openEventModal(eventId) {
    const ev = studentEvents.find(x => x.id === eventId);
    if (!ev) return;
    
    document.getElementById('event-modal-title').innerText = ev.title;
    document.getElementById('event-modal-desc').innerHTML = ev.desc;
    document.getElementById('event-modal-cat').innerText = ev.category;
    document.getElementById('event-modal-date').innerText = ev.date;
    
    const gallery = document.getElementById('event-modal-gallery');
    gallery.innerHTML = '';
    
    if (ev.assets && ev.assets.length > 0) {
        ev.assets.forEach(asset => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            
            let preview = '';
            let btn_txt = '';
            
            if (asset.is_pdf) {
                preview = `
                <div class="pdf-preview-placeholder">
                    <i class="far fa-file-pdf"></i>
                    <span>PDF FILE</span>
                </div>`;
                btn_txt = '<i class="fas fa-file-alt"></i> View PDF Inline';
            } else if (asset.is_video) {
                preview = `
                <div class="pdf-preview-placeholder" style="background: linear-gradient(135deg, var(--primary), var(--accent)); color: white;">
                    <i class="far fa-file-video"></i>
                    <span>VIDEO CLIP</span>
                </div>`;
                btn_txt = '<i class="fas fa-play"></i> Play Video';
            } else {
                preview = `<img src="${asset.path}" alt="${asset.name}" loading="lazy">`;
                btn_txt = '<i class="fas fa-expand-alt"></i> View cert';
            }
            
            card.innerHTML = `
                <div class="card-img-wrapper">
                    ${preview}
                </div>
                <div class="card-info">
                    <h4 title="${asset.name}">${asset.name}</h4>
                    <a href="${asset.path}" target="_blank" class="view-btn">${btn_txt}</a>
                </div>
            `;
            
            gallery.appendChild(card);
            
            if (asset.is_pdf) {
                setupCardPDFPreview(card);
            }
        });
        
        const mainModal = document.getElementById('image-modal');
        const galleryImgs = gallery.querySelectorAll('.gallery-card img:not(.pdf-canvas-preview)');
        galleryImgs.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                mainModal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt || "Certificate";
            });
        });
    } else {
        gallery.innerHTML = '<p class="no-assets-msg">No evidence documents attached for this event.</p>';
    }
    
    document.getElementById('event-details-modal').style.display = 'flex';
}

function closeEventModal() {
    document.getElementById('event-details-modal').style.display = 'none';
}

// Close event details modal if clicked outside
window.addEventListener('click', (e) => {
    const evModal = document.getElementById('event-details-modal');
    if (e.target === evModal) {
        evModal.style.display = 'none';
    }
});

// Run PDF initialization and set up interactive events on load
document.addEventListener('DOMContentLoaded', () => {
    initPDFSystem();

    // Active navigation highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navAnchorLinks = document.querySelectorAll('.nav-links a, .nav-contact');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 220)) {
                current = section.getAttribute('id');
            }
        });
        
        navAnchorLinks.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href && href.startsWith('#') && href === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Contact Form submission handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formStatus.style.display = 'none';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                formStatus.style.display = 'block';
                formStatus.className = 'form-status-msg success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! Thank you for contacting me.';
                
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1200);
        });
    }

    document.documentElement.style.scrollBehavior = 'smooth';
});
