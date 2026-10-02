// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Global Functionality
    // ====================

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);

        
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);

        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

   
    const menuToggle = document.querySelector('.menu-toggle') || document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active'); // 
            this.classList.toggle('active'); // 
            this.setAttribute('aria-expanded', navbar.classList.contains('active'));
        });
    }

    
    if (navbar) { 
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuToggle) { // 
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error("Error finding target for smooth scroll:", targetId, error);
            }
        });
    });

   
    if (document.querySelector('.stories-list') || document.getElementById('story-modal')) {
       
        const storyFilter = document.getElementById('story-type');
        const storySearch = document.getElementById('story-search');
        const storyCards = document.querySelectorAll('.story-card'); 

        function filterStories() {
            const filterValue = storyFilter ? storyFilter.value.toLowerCase() : 'all';
            const searchValue = storySearch ? storySearch.value.toLowerCase() : '';

            storyCards.forEach(card => {
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                const tags = (card.getAttribute('data-tags') || '').toLowerCase();
                const textContent = (card.textContent || '').toLowerCase();

                const categoryMatch = filterValue === 'all' || category === filterValue;
                const searchMatch = textContent.includes(searchValue) || tags.includes(searchValue);

                if (categoryMatch && searchMatch) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (storyFilter) {
            storyFilter.addEventListener('change', filterStories);
        }
        if (storySearch) {
            storySearch.addEventListener('input', filterStories);
        }

      
        const storyModal = document.getElementById('story-modal');
        const readMoreBtns = document.querySelectorAll('.read-more');
        const closeModalBtn = storyModal ? storyModal.querySelector('.close-modal') : null;

        if (storyModal) {
            const stories = {
                1: {
                    title: "Lebo's Journey to Freedom",
                    author: "Lebo, 32",
                    location: "Gaborone",
                    content: `<p>After 5 years in an abusive marriage, Lebo found the courage to leave when she discovered our platform. "Reading other women's stories made me realize I wasn't alone," she says.</p><p>The final straw came when her husband's abuse began affecting their children. "I knew I had to protect them, even if it meant leaving everything behind."</p><p>With help from our shelter partners, Lebo and her children found safety. She completed vocational training and now runs a small catering business.</p><p>"Today, I'm proud to say I'm rebuilding my life. I volunteer at the women's shelter that helped me, because I want others to know there is hope."</p>`,
                    image: "images/story1.jpg" 
                },
                2: {
                    title: "Thabo: Breaking the Silence",
                    author: "Thabo, 28",
                    location: "Francistown",
                    content: `<p>Male survivors often suffer in silence, and Thabo was no exception. "For years I thought I was the only man this had happened to," he shares.</p><p>Thabo was sexually abused by a family member from ages 9 to 13. "I buried the pain until it started affecting my relationships and mental health."</p><p>After finding our men's support group, Thabo began healing. "Meeting other male survivors changed everything. We need to break the stigma that men can't be victims."</p><p>Now a peer counselor, Thabo helps other men come forward. "Healing is possible when we stop suffering in silence."</p>`,
                    image: "images/story2.jpg" 
                },
                3: {
                    title: "The Motsumi Family's Transformation",
                    author: "Motsumi Family",
                    location: "Maun",
                    content: `<p>Three generations of the Motsumi family are breaking cycles of emotional abuse. "We didn't even realize how toxic our family dynamics were," says mother Kelebogile.</p><p>After daughter Oratile's school referred them to our family counseling program, they began unpacking decades of harmful patterns. "We learned that yelling and put-downs weren't normal."</p><p>Through weekly sessions, the family developed healthy communication skills. "Now we actually talk through conflicts instead of exploding," says 14-year-old Oratile.</p><p>"Change is hard but so worth it," adds grandfather Olebile. "I'm proud we're creating a new legacy for our family."</p>`,
                    image: "images/story3.jpg" 
                }
            };

            readMoreBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const storyId = this.getAttribute('data-story');
                    const story = stories[storyId];
                    const modalBody = storyModal.querySelector('.modal-body');

                    if (story && modalBody) {
                        modalBody.innerHTML = `
                            <div class="modal-image">
                                <img src="${story.image}" alt="${story.title}">
                            </div>
                            <div class="modal-text">
                                <h2>${story.title}</h2>
                                <div class="modal-meta">
                                    <span><i class="fas fa-user"></i> ${story.author}</span>
                                    <span><i class="fas fa-map-marker-alt"></i> ${story.location}</span>
                                </div>
                                ${story.content}
                                <div class="modal-actions">
                                    <button class="btn secondary"><i class="fas fa-share"></i> Share This Story</button>
                                    <button class="btn primary"><i class="fas fa-hands-helping"></i> Get Help</button>
                                </div>
                            </div>
                        `;
                        storyModal.classList.add('active');
                        document.body.style.overflow = 'hidden'; 
                    }
                });
            });

            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    storyModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

         
            storyModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        const triggerTestimonial = document.getElementById('trigger-testimonial');
        if (triggerTestimonial) {
            triggerTestimonial.addEventListener('click', function() {
                alert("Audio recording functionality would be implemented here. In a real app, this would use the Web Audio API.");
            });
        }
    }



    if (document.querySelector('.resource-tabs')) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });

        const callButtons = document.querySelectorAll('.btn-call');
        callButtons.forEach(button => {
            button.addEventListener('click', function() {
                const parent = this.closest('.emergency-card') || this.parentElement; 
                const numberElement = parent.querySelector('.emergency-number');
                if (numberElement) {
                    const number = numberElement.textContent.trim();
                    if (confirm(`Call ${number}?`)) {
                        alert(`Connecting to ${number}... (simulated call)`);
                 
                    }
                }
            });
        });

 
        const safetyPlanDownloadBtn = document.querySelector('.btn.primary.download-safety-plan') || 
                                     (document.querySelector('.btn.primary') && document.querySelector('.btn.primary').textContent.toLowerCase().includes('safety plan') ? document.querySelector('.btn.primary') : null);

        if (safetyPlanDownloadBtn) {
            safetyPlanDownloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert("Safety plan PDF would download here. In a real app, this would link to an actual PDF file.");
            });
        }

        const startQuizBtn = document.querySelector('.start-quiz');
        const quizModal = document.getElementById('quiz-modal');
        if (startQuizBtn && quizModal) {
            startQuizBtn.addEventListener('click', function() {
                quizModal.innerHTML = `
                    <div class="quiz-container">
                        <div class="quiz-header">
                            <h2>GBV Knowledge Quiz</h2>
                            <button class="close-quiz"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="quiz-progress">
                            <div class="progress-bar" style="width: 0%;"></div>
                            <span class="progress-text">Question 1 of 5</span>
                        </div>
                        <div class="quiz-question">
                            <h3>Which of these is NOT a form of gender-based violence?</h3>
                            <div class="quiz-options">
                                <label><input type="radio" name="q1" value="a"><span>Physical assault</span></label>
                                <label><input type="radio" name="q1" value="b"><span>Emotional abuse</span></label>
                                <label><input type="radio" name="q1" value="c"><span>Financial control</span></label>
                                <label><input type="radio" name="q1" value="d"><span>Mutual disagreement</span></label>
                            </div>
                        </div>
                        <div class="quiz-navigation">
                            <button class="btn secondary" disabled>Previous</button>
                            <button class="btn primary">Next</button>
                        </div>
                    </div>
                `;
                quizModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                const closeQuiz = quizModal.querySelector('.close-quiz');
                if (closeQuiz) {
                    closeQuiz.addEventListener('click', () => {
                        quizModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                }
            });
        }
    }



    if (document.querySelector('.connect-options') || document.getElementById('story-form')) {
        const optionTabs = document.querySelectorAll('.option-tab');
        const optionContents = document.querySelectorAll('.option-content');
        optionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                optionTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                optionContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });

        const methodBtns = document.querySelectorAll('.method-btn');
        const shareForm = document.getElementById('story-form');
        const audioRecorder = document.getElementById('audio-recorder');
        methodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                methodBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const method = this.getAttribute('data-method');

                if(shareForm) shareForm.classList.add('hidden');
                if(audioRecorder) audioRecorder.classList.add('hidden');

                if (method === 'written' && shareForm) {
                    shareForm.classList.remove('hidden');
                } else if (method === 'audio' && audioRecorder) {
                    audioRecorder.classList.remove('hidden');
                } else if (method === 'video') {
                    alert("Video submission would be implemented here.");
                }
            });
        });

        const storyTextarea = document.getElementById('story');
        const wordCount = document.querySelector('.word-count');
        if (storyTextarea && wordCount) {
            storyTextarea.addEventListener('input', function() {
                const text = this.value.trim();
                const count = text === '' ? 0 : text.split(/\s+/).length;
                wordCount.textContent = `${count}/2000 words`;
                wordCount.style.color = count > 2000 ? 'var(--danger-color, red)' : '';
            });
        }

        if (shareForm) {
            shareForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const storyTextValue = this.story ? this.story.value.trim() : "";
                const words = storyTextValue === '' ? 0 : storyTextValue.split(/\s+/).length;
                if (words > 2000) {
                    alert("Please keep your story under 2000 words.");
                    return;
                }
                alert("Thank you for sharing your story. Our team will review it and may contact you if we have questions.");
                this.reset();
                if (wordCount) wordCount.textContent = "0/2000 words";
            });
        }

        const startRecord = document.getElementById('start-record');
        const stopRecord = document.getElementById('stop-record'); /
        const submitAudio = document.getElementById('submit-audio');
        const audioPlayback = document.getElementById('audio-playback');
        const recordingStatus = document.querySelector('.recording-status');
        if (startRecord && stopRecord && submitAudio && audioPlayback && recordingStatus) {
            startRecord.addEventListener('click', function() {
                this.classList.add('hidden');
                recordingStatus.classList.remove('hidden');
                stopRecord.classList.remove('hidden'); 

                setTimeout(() => { 
                    if (document.body.contains(stopRecord) && !stopRecord.classList.contains('hidden')) {
                         stopRecord.click();
                    }
                }, 5000);
            });

            stopRecord.addEventListener('click', function() {
                recordingStatus.classList.add('hidden');
                this.classList.add('hidden'); // 
                audioPlayback.classList.remove('hidden');
                submitAudio.classList.remove('hidden');
            
                alert("Recording stopped (simulated). Playback and submission enabled.");
            });

            submitAudio.addEventListener('click', function() {
                alert("Your audio story has been submitted. Thank you for sharing.");
                audioPlayback.classList.add('hidden');
                audioPlayback.src = ""; // Clear src
                this.classList.add('hidden');
                startRecord.classList.remove('hidden');
            });
        }
    }

   
    if (document.querySelector('.feedback-container')) {
        const stars = document.querySelectorAll('.rating-stars input');
        stars.forEach(star => {
            star.addEventListener('change', function() {
              
            });
        });

        const contactRadios = document.querySelectorAll('input[name="contact-preference"]');
        const contactInfo = document.getElementById('contact-info');
        if(contactInfo) { 
            contactRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'yes') {
                        contactInfo.classList.remove('hidden');
                    } else {
                        contactInfo.classList.add('hidden');
                    }
                });
            });
        }


        const feedbackForm = document.getElementById('feedback-form');
        const thankYou = document.getElementById('thank-you');
        const newFeedback = document.getElementById('new-feedback');
        if (feedbackForm && thankYou) {
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                this.classList.add('hidden');
                thankYou.classList.remove('hidden');
                thankYou.scrollIntoView({ behavior: 'smooth' });
            });
        }

        if (newFeedback && feedbackForm && thankYou) {
            newFeedback.addEventListener('click', function() {
                feedbackForm.reset();
                feedbackForm.classList.remove('hidden');
                thankYou.classList.add('hidden');
                if (contactInfo) contactInfo.classList.add('hidden');
                const noContactRadio = document.querySelector('input[name="contact-preference"][value="no"]');
                if (noContactRadio) noContactRadio.checked = true;
                feedbackForm.scrollIntoView({ behavior: 'smooth' });
            });
        }

        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentTestimonial = 0;
        let testimonialInterval;

        function showTestimonial(index) {
            if (testimonials.length === 0) return;
            testimonials.forEach((testimonial, i) => testimonial.classList.toggle('active', i === index));
            if (dots.length > 0) dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentTestimonial = index;
        }
        
        function autoNextTestimonial() {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            showTestimonial(nextIndex);
        }

        if (testimonials.length > 0) {
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    autoNextTestimonial();
                    if (testimonialInterval) clearInterval(testimonialInterval);
                    if (testimonials.length > 1) testimonialInterval = setInterval(autoNextTestimonial, 8000);
                });
            }
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    let prevIndex = currentTestimonial - 1;
                    if (prevIndex < 0) prevIndex = testimonials.length - 1;
                    showTestimonial(prevIndex);
                    if (testimonialInterval) clearInterval(testimonialInterval);
                    if (testimonials.length > 1) testimonialInterval = setInterval(autoNextTestimonial, 8000);
                });
            }
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                    if (testimonialInterval) clearInterval(testimonialInterval);
                    if (testimonials.length > 1) testimonialInterval = setInterval(autoNextTestimonial, 8000);
                });
            });
            showTestimonial(0); 
            if (testimonials.length > 1) { 
                testimonialInterval = setInterval(autoNextTestimonial, 8000);
            }
        }
    }

  
    const animatedElements = document.querySelectorAll('.animated');
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); 
                    
                    obs.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 }); 

        animatedElements.forEach(el => observer.observe(el));
    } else if (animatedElements.length > 0) { /
        const animateOnScrollFallback = () => {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                
                }
            });
        };
        window.addEventListener('scroll', animateOnScrollFallback);
        animateOnScrollFallback();
    }

   
    const darkModeStyles = `
        body.dark-mode {
            background-color: #121212;
            color: #e0e0e0;
        }
        body.dark-mode header {
            background-color: #1e1e1e;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        body.dark-mode .navbar a { color: #e0e0e0; }
        body.dark-mode .navbar a.active { color: var(--primary-color, #4CAF50); /* Adjust as needed */ }
        body.dark-mode .logo h1 { color: #e0e0e0; }
        body.dark-mode .icon-btn { color: #e0e0e0; }
        body.dark-mode .register-btn { background-color: var(--primary-color-dark, #FFC107); color: #121212; }
        body.dark-mode .btn.primary { background-color: var(--primary-color-dark, #FFC107); color: #121212; }
        body.dark-mode .btn.secondary { background-color: #333; color: #e0e0e0; border-color: #555; }
        body.dark-mode .story-card,
        body.dark-mode .stat-card,
        body.dark-mode .resource-card,
        body.dark-mode .emergency-card,
        body.dark-mode .feedback-form,
        body.dark-mode .connect-form, /* Define this class if not already */
        body.dark-mode .quiz-container,
        body.dark-mode .modal-content, /* Assuming modal content has this class */
        body.dark-mode .testimonial {
            background-color: #1e1e1e;
            box-shadow: 0 3px 10px rgba(0,0,0,0.5);
            border: 1px solid #333;
        }
        body.dark-mode input,
        body.dark-mode textarea,
        body.dark-mode select {
            background-color: #2d2d2d;
            color: #e0e0e0;
            border-color: #444;
        }
        body.dark-mode input::placeholder,
        body.dark-mode textarea::placeholder { color: #777; }
        body.dark-mode footer {
            background-color: #1a1a1a;
            border-top: 1px solid #333;
        }
        body.dark-mode .footer-section h3 { color: #f0f0f0; }
        body.dark-mode .footer-section ul li a,
        body.dark-mode .footer-section ul li p,
        body.dark-mode .footer-section ul li p a { color: #ccc; }
        body.dark-mode .social-icons a i { color: #ccc; }
        body.dark-mode .social-icons a:hover i { color: var(--primary-color, #4CAF50); }
        body.dark-mode .copyright p { color: #aaa; }
        /* Add any other specific dark mode styles your site needs */
    `;

    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-dark-mode-styles';
    styleElement.innerHTML = darkModeStyles;
    document.head.appendChild(styleElement);

});