// Create particles
const particlesContainer = document.getElementById('particles');
const particleCount = Math.floor(window.innerWidth / 10);

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random size between 1px and 3px
  const size = Math.random() * 2 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random position
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  
  // Random opacity
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  
  // Random animation duration
  const duration = Math.random() * 20 + 10;
  particle.style.animationDuration = `${duration}s`;
  
  // Random delay
  particle.style.animationDelay = `${Math.random() * 10}s`;
  
  particlesContainer.appendChild(particle);
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Generator modal functions
const generatorModal = document.getElementById('generatorModal');

function openGeneratorModal() {
  generatorModal.classList.add('active');
}

function closeGeneratorModal() {
  generatorModal.classList.remove('active');
}

// Close modal when clicking outside
generatorModal.addEventListener('click', (e) => {
  if (e.target === generatorModal) {
    closeGeneratorModal();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeGeneratorModal();
  }
});

// Bypasser functionality
let selectedBypasser = null;
const bypasserLinks = {
  1: 'soon',
  2: 'soon'
};

function showBypasserOptions() {
  const options = document.getElementById('bypasserOptions');
  options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
}

function selectBypasser(number) {
  selectedBypasser = number;
  const options = document.querySelectorAll('.bypasser-option');
  const goToBtn = document.getElementById('goToBypasser');
  
  options.forEach((option, index) => {
    if (index === number - 1) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });
  
  // Enable the button when a bypasser is selected
  if (selectedBypasser) {
    goToBtn.classList.add('active');
  } else {
    goToBtn.classList.remove('active');
  }
}

function goToBypasser() {
  if (selectedBypasser) {
    window.open(bypasserLinks[selectedBypasser], '_blank');
  }
}

// Initialize with no bypasser selected
selectBypasser(null);

// Add visual feedback for button clicks
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    e.target.style.transform = 'scale(0.98)';
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  // Allow Enter and Space to trigger button clicks
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.btn, .modal-option, .bypasser-option')) {
    e.preventDefault();
    e.target.click();
  }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add loading animation for external links
function addLoadingFeedback(element) {
  const originalText = element.innerHTML;
  element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  
  setTimeout(() => {
    element.innerHTML = originalText;
  }, 1000);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Scroll-based animations or effects can go here
}, 100));

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Apply ripple effect to primary buttons
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(0, 0, 0, 0.1);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize accessibility features
function initializeAccessibility() {
  // Ensure all interactive elements are focusable
  const interactiveElements = document.querySelectorAll('.btn, .modal-option, .bypasser-option');
  interactiveElements.forEach(element => {
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
  });

  // Add ARIA labels where needed
  const generatorBtn = document.querySelector('[onclick="openGeneratorModal()"]');
  if (generatorBtn) {
    generatorBtn.setAttribute('aria-label', 'Open generator options modal');
  }

  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    scrollBtn.setAttribute('aria-label', 'Scroll to top of page');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeAccessibility();
  
  // Add fade-in animation to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Handle window resize for responsive particles
window.addEventListener('resize', function() {
  // Recalculate particle count on resize
  const newParticleCount = Math.floor(window.innerWidth / 10);
  const currentParticles = particlesContainer.children.length;
  
  if (newParticleCount !== currentParticles) {
    // Remove all particles and recreate
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < newParticleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
});

// Add hover sound effect (optional, requires user interaction)
function playHoverSound() {
  // Create a subtle click sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Apply hover sound to buttons (only after user interaction)
let audioEnabled = false;
document.addEventListener('click', function() {
  if (!audioEnabled) {
    audioEnabled = true;
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mouseenter', playHoverSound);
    });
  }
}, { once: true });

console.log('🌬️ Breezy initialized successfully!');
