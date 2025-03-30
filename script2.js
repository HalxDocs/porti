setTimeout(function() {
    loader.style.opacity = '0';
    document.body.classList.add('loaded');
    // ... rest of the code
  }, 2000);

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // CV Popup Functionality
    const cvButtons = document.querySelectorAll('#cv-btn, #cv-btn2, #cv-btn3');
    const cvPopup = document.getElementById('cv-popup');
    const closeCV = document.getElementById('close-cv');
    
    cvButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cvPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeCV.addEventListener('click', function() {
        cvPopup.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close popup when clicking outside
    cvPopup.addEventListener('click', function(e) {
        if (e.target === cvPopup) {
            cvPopup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Changing text in hero section
    const titles = ['Frontend Developer', 'Web Designer', 'UI/UX Developer', 'Full Stack Developer'];
    let currentIndex = 0;
    const changingTitle = document.querySelector('.changing-title');
    
    function changeTitle() {
        currentIndex = (currentIndex + 1) % titles.length;
        changingTitle.style.opacity = '0';
        changingTitle.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            changingTitle.textContent = titles[currentIndex];
            changingTitle.style.opacity = '1';
            changingTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    setInterval(changeTitle, 3000);
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll reveal animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Add reveal class to elements
    document.querySelectorAll('.service-card, .skill-item, .project-card, .about-image, .about-text').forEach(el => {
        el.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        if (chatbotWindow.style.display === 'flex') {
            closeChatbot();
        } else {
            openChatbot();
        }
    });
    
    // Close chatbot with close button
    chatbotClose.addEventListener('click', closeChatbot);
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Open chatbot
    function openChatbot() {
        chatbotWindow.style.display = 'flex';
        chatbotToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
    
    // Close chatbot
    function closeChatbot() {
        chatbotWindow.style.display = 'none';
        chatbotToggle.innerHTML = '<i class="fas fa-robot"></i>';
    }
    
    // Send message
    function sendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;
        
        // Add user message
        addMessage(messageText, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response after delay
        setTimeout(function() {
            removeTypingIndicator();
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.textContent = text;
        
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            typingDiv.appendChild(dot);
        }
        
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot response
    function getBotResponse(userInput) {
        const input = userInput.toLowerCase();
        
        if (input.includes('hello') || input.includes('hi')) {
            return "Hi there! What would you like to know about my work?";
        } else if (input.includes('project') || input.includes('work')) {
            return "I've worked on several projects including web apps, mobile applications, and UX designs. Check my projects section!";
        } else if (input.includes('contact') || input.includes('email')) {
            return "You can reach me via email at hello@yourportfolio.com or through the contact form.";
        } else if (input.includes('skill') || input.includes('experience')) {
            return "My skills include frontend development, UI/UX design, and more. Visit the skills section for details!";
        } else if (input.includes('thank') || input.includes('thanks')) {
            return "You're welcome! Let me know if you have any other questions.";
        } else {
            return "That's interesting! For more details, feel free to explore my portfolio or contact me directly.";
        }
    }
});

    document.addEventListener('DOMContentLoaded', function() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, 500);
        document.getElementById('globe').appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/earthmap1k.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 10;

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, 500);
            camera.aspect = window.innerWidth / 500;
            camera.updateProjectionMatrix();
        });
    });

//     // Loader functionality
// window.addEventListener('load', function() {
//     // This loader is meant to be shown before the main content loads
//     // In a real implementation, you would typically:
//     // 1. Show this loader first
//     // 2. Load your main content in the background
//     // 3. When main content is ready, hide loader and show content
    
//     // For demonstration, we'll just redirect after 3 seconds
//     setTimeout(function() {
//         window.location.href = "index.html"; // Replace with your main page
//     }, 3000);
// });
